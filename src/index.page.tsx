import { useIsClientRender, useLocation, useRouter } from '@blinkorb/resolute';
import queryString from 'query-string';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { createUseStyles } from 'react-jss';
import { v4 as uuid } from 'uuid';

import AuthExpired from './components/auth-expired.js';
import Footer from './components/footer.js';
import LoadingDots from './components/loading-dots.js';
import Navbar, { NAVBAR_HEIGHT } from './components/navbar.js';
import Pattern from './components/pattern.js';
import {
  GROUPED_PATTERNS,
  GROUPINGS,
  MANIFEST_TIMEOUT,
  POLLING_INTERVAL,
  ROOT_PRESENTATION_NODE_HASH,
  SessionStore,
} from './constants.js';
import { useStateContext } from './context.js';
import { onlyPatternsAndOutput } from './items.js';
import { TranslationKey, useTranslate } from './translations.js';
import {
  APIErrorCode,
  APIResponse,
  ComponentType,
  DamageTypeResponse,
  EquipmentSlotResponse,
  ItemsResponse,
  ItemType,
  LinkedProfilesResponse,
  ManifestResponse,
  MembershipType,
  PatternWithCompletion,
  PresentationNode,
  PresentationNodesResponse,
  PresentationNodeWithPresentationNodes,
  PresentationNodeWithRecords,
  ProfileResponse,
  RecordsResponse,
  TokenResponse,
} from './types.js';
import { exists, logError, logInfo } from './utils.js';

export const title = 'Destiny 2 Pattern Tracker';
export const description =
  'Track your Destiny 2 craftable weapons & pattern progress';

const useStyles = createUseStyles((theme) => ({
  intro: {
    margin: 0,
    padding: 12,
    marginTop: 12,
    textAlign: 'center',
    fontStyle: 'italic',
    color: theme.BORDER,
  },
  loading: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    paddingTop: NAVBAR_HEIGHT,
  },
  main: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    paddingTop: NAVBAR_HEIGHT,
  },
  list: {
    display: 'flex',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: 12,
    margin: 0,
    gap: 8,
  },
  groupList: {
    display: 'flex',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: 12,
    margin: 0,
    gap: 8,
  },
  group: {
    padding: 8,
    margin: 0,
    border: '1px solid',
    borderColor: theme.BORDER_FAINT,
  },
  groupTitle: {
    fontSize: 16,
    padding: 0,
    margin: 0,
    marginBottom: 8,
  },
  subGroupList: {
    display: 'flex',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: 0,
    margin: 0,
    gap: 16,
  },
  subGroup: {
    padding: 0,
    margin: 0,
  },
  subGroupItemList: {
    display: 'flex',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: 0,
    margin: 0,
    gap: 8,
  },
  ungroupedTitle: {
    margin: 0,
    padding: 12,
    fontSize: 16,
    fontWeight: 'bold',
  },
}));

const Home = () => {
  const styles = useStyles();
  const router = useRouter();
  const location = useLocation();
  const translate = useTranslate();
  const { code, state: authState } = queryString.parse(location.search);
  const isClientRender = useIsClientRender();
  const [state, setState] = useStateContext();
  const [authExpired, setAuthExpired] = useState(false);
  const [userLoadingState, setUserLoadingState] = useState<boolean>(true);
  const [manifestLoadingState, setManifestLoadingState] = useState<
    false | TranslationKey
  >('loadingManifest');
  const [profile, setProfile] = useState<ProfileResponse>();
  const hasTokenRef = useRef(!!state.session?.token);
  hasTokenRef.current = !!state.session?.token;

  const reAuth = useCallback(() => {
    const nextAuthState = uuid();

    setState((prev) => ({
      ...prev,
      session: {
        ...prev.session,
        [SessionStore.TOKEN]: undefined,
        [SessionStore.AUTH_STATE]: nextAuthState,
      },
    }));

    globalThis.location.href = `${process.env.CLIENT_API_URL}/${state.language}/OAuth/Authorize?client_id=${process.env.CLIENT_ID}&response_type=code&state=${nextAuthState}`;
  }, [setState, state.language]);

  const clearAuth = useCallback(() => {
    setState((prev) => ({
      ...prev,
      session: null,
    }));
    setProfile(undefined);
  }, [setState]);

  useEffect(() => {
    if (!isClientRender) {
      return;
    }

    if (
      typeof code === 'string' &&
      typeof authState === 'string' &&
      typeof state.session?.authState === 'string' &&
      authState === state.session.authState
    ) {
      const getToken = async () => {
        const tokenResponse = await fetch(
          `${process.env.CLIENT_API_URL}/platform/app/oauth/token/`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
              code,
              // eslint-disable-next-line camelcase
              grant_type: 'authorization_code',
              // eslint-disable-next-line camelcase
              client_id: process.env.CLIENT_ID,
            }),
          }
        ).then<TokenResponse>((response) => {
          if (response.ok) {
            return response.json();
          }

          throw new Error('Failed to request token');
        });

        setState((prev) => ({
          ...prev,
          session: {
            ...prev.session,
            token: tokenResponse,
          },
        }));

        router.navigate(
          '/',
          {},
          {
            replace: true,
          }
        );
      };

      getToken();
    } else if (code) {
      router.navigate(
        '/',
        {},
        {
          replace: true,
        }
      );
    }
  }, [
    authState,
    code,
    isClientRender,
    router,
    setState,
    state.session?.authState,
  ]);

  useEffect(() => {
    if (!isClientRender) {
      return;
    }

    const getProfile = async () => {
      setUserLoadingState(true);

      const token = state.session?.token?.access_token;
      const tokenType = state.session?.token?.token_type;
      const membershipId = state.session?.token?.membership_id;

      if (!membershipId || !token || !tokenType) {
        setUserLoadingState(false);
        return;
      }

      const linkedProfiles = await fetch(
        `${process.env.CLIENT_API_URL}/Platform/Destiny2/${MembershipType.BungieNext}/Profile/${membershipId}/LinkedProfiles/`,
        {
          headers: {
            Authorization: `${tokenType} ${token}`,
            'X-API-Key': process.env.CLIENT_API_KEY,
          },
        }
      )
        .then<APIResponse<LinkedProfilesResponse>>((response) => {
          if (response.ok) {
            return response.json();
          }

          if (response.status === 401) {
            setAuthExpired(true);
          }

          try {
            return response.json();
          } catch (error) {
            logError(error);

            throw new Error('Failed to request linked profiles');
          }
        })
        .then((response) => {
          if (response.ErrorCode === APIErrorCode.Success) {
            return response.Response;
          }

          throw new Error(response.Message);
        });

      const firstProfile = linkedProfiles.profiles[0];

      if (!firstProfile) {
        setUserLoadingState(false);
        throw new Error('No profiles found');
      }

      const profileResponse = await fetch(
        `${process.env.CLIENT_API_URL}/Platform/Destiny2/${firstProfile.membershipType}/Profile/${firstProfile.membershipId}/?components=${ComponentType.Records}`,
        {
          headers: {
            Authorization: `${tokenType} ${token}`,
            'X-API-Key': process.env.CLIENT_API_KEY,
          },
        }
      )
        .then<APIResponse<ProfileResponse>>((response) => {
          if (response.ok) {
            return response.json();
          }

          if (response.status === 401) {
            setAuthExpired(true);
          }

          try {
            return response.json();
          } catch (error) {
            logError(error);

            throw new Error('Failed to request profile records');
          }
        })
        .then((response) => {
          if (response.ErrorCode === APIErrorCode.Success) {
            return response.Response;
          }

          throw new Error(response.Message);
        });

      setUserLoadingState(false);
      if (hasTokenRef.current) {
        // Prevent saving profile if we logged out during loading
        setProfile(profileResponse);
      }
    };

    const interval = globalThis.window
      ? globalThis.window.setInterval(() => {
          getProfile();
        }, POLLING_INTERVAL)
      : undefined;

    getProfile();

    return () => {
      if (globalThis.window && typeof interval === 'number') {
        globalThis.window.clearInterval(interval);
      }
    };
  }, [isClientRender, reAuth, state.session?.token]);

  useEffect(() => {
    if (!state.dbInitialized || code || !isClientRender) {
      return;
    }

    const loadManifest = async () => {
      const {
        meta,
        manifest,
        items,
        records,
        presentationNodes,
        damageType,
        equipmentSlot,
      } = state.persistent ?? {};

      if (
        meta &&
        manifest &&
        items &&
        records &&
        presentationNodes &&
        damageType &&
        equipmentSlot &&
        meta.manifestUpdated >= Date.now() - MANIFEST_TIMEOUT &&
        meta.manifestLanguage === state.language
      ) {
        setManifestLoadingState(false);
        return;
      }

      setManifestLoadingState('loadingManifest');

      const nextManifest =
        meta &&
        manifest &&
        meta.manifestUpdated >= Date.now() - MANIFEST_TIMEOUT
          ? manifest
          : await fetch(
              `${process.env.CLIENT_API_URL}/Platform/Destiny2/Manifest/`
            )
              .then<APIResponse<ManifestResponse>>((response) => {
                if (response.ok) {
                  return response.json();
                }

                try {
                  return response.json();
                } catch (error) {
                  logError(error);

                  throw new Error('Failed to request manifest');
                }
              })
              .then((response) => {
                if (response.ErrorCode === APIErrorCode.Success) {
                  return response.Response;
                }

                throw new Error(response.Message);
              });

      setManifestLoadingState('loadingItems');

      const [
        nextItems,
        nextRecords,
        nextPresentationNodes,
        nextDamageType,
        nextEquipmentSlot,
      ] = await Promise.all([
        meta &&
        items &&
        manifest?.version === nextManifest.version &&
        meta.manifestLanguage === state.language
          ? items
          : fetch(
              `${process.env.CLIENT_API_URL}${
                nextManifest.jsonWorldComponentContentPaths[state.language]
                  .DestinyInventoryItemDefinition
              }`
            )
              .then<ItemsResponse>(async (response) => {
                if (response.ok) {
                  return JSON.parse(await response.text());
                }

                try {
                  return JSON.parse(await response.text());
                } catch (error) {
                  logError(error);

                  throw new Error('Failed to request items');
                }
              })
              .then((i) => onlyPatternsAndOutput(i)),
        meta &&
        records &&
        manifest?.version === nextManifest.version &&
        meta.manifestLanguage === state.language
          ? records
          : fetch(
              `${process.env.CLIENT_API_URL}${
                nextManifest.jsonWorldComponentContentPaths[state.language]
                  .DestinyRecordDefinition
              }`
            ).then<RecordsResponse>(async (response) => {
              if (response.ok) {
                return JSON.parse(await response.text());
              }

              try {
                return JSON.parse(await response.text());
              } catch (error) {
                logError(error);

                throw new Error('Failed to request records');
              }
            }),
        meta &&
        presentationNodes &&
        manifest?.version === nextManifest.version &&
        meta.manifestLanguage === state.language
          ? presentationNodes
          : fetch(
              `${process.env.CLIENT_API_URL}${
                nextManifest.jsonWorldComponentContentPaths[state.language]
                  .DestinyPresentationNodeDefinition
              }`
            ).then<PresentationNodesResponse>(async (response) => {
              if (response.ok) {
                return JSON.parse(await response.text());
              }

              try {
                return JSON.parse(await response.text());
              } catch (error) {
                logError(error);

                throw new Error('Failed to request presentation nodes');
              }
            }),
        meta &&
        damageType &&
        manifest?.version === nextManifest.version &&
        meta.manifestLanguage === state.language
          ? damageType
          : fetch(
              `${process.env.CLIENT_API_URL}${
                nextManifest.jsonWorldComponentContentPaths[state.language]
                  .DestinyDamageTypeDefinition
              }`
            ).then<DamageTypeResponse>(async (response) => {
              if (response.ok) {
                return JSON.parse(await response.text());
              }

              try {
                return JSON.parse(await response.text());
              } catch (error) {
                logError(error);

                throw new Error('Failed to request damage types');
              }
            }),
        meta &&
        equipmentSlot &&
        manifest?.version === nextManifest.version &&
        meta.manifestLanguage === state.language
          ? equipmentSlot
          : fetch(
              `${process.env.CLIENT_API_URL}${
                nextManifest.jsonWorldComponentContentPaths[state.language]
                  .DestinyEquipmentSlotDefinition
              }`
            ).then<EquipmentSlotResponse>(async (response) => {
              if (response.ok) {
                return JSON.parse(await response.text());
              }

              try {
                return JSON.parse(await response.text());
              } catch (error) {
                logError(error);

                throw new Error('Failed to request equipment slots');
              }
            }),
      ]);

      const nextMeta = {
        ...meta,
        manifestUpdated: Date.now(),
        manifestLanguage: state.language,
      };

      setState((prev) => ({
        ...prev,
        persistent: {
          ...prev.persistent,
          meta: nextMeta,
          manifest: nextManifest,
          items: nextItems,
          records: nextRecords,
          presentationNodes: nextPresentationNodes,
          damageType: nextDamageType,
          equipmentSlot: nextEquipmentSlot,
        },
      }));

      setManifestLoadingState(false);
    };

    loadManifest();
  }, [
    code,
    isClientRender,
    setState,
    state.dbInitialized,
    state.language,
    state.persistent,
  ]);

  const patternOrCatalystRecordHashes = useMemo(() => {
    const presentationNodes = state.persistent?.presentationNodes;

    if (!presentationNodes) {
      return null;
    }

    const rootNode = presentationNodes[ROOT_PRESENTATION_NODE_HASH];

    if (!rootNode) {
      throw new Error('Could not find root presentation node');
    }

    const reduceRecordHashes = (
      acc: readonly number[],
      node: PresentationNode | undefined
    ): readonly number[] => {
      if (!node) {
        return acc;
      }

      if (node.children.presentationNodes.length) {
        return (
          node as PresentationNodeWithPresentationNodes
        ).children.presentationNodes.reduce(
          (acc2, subNode) =>
            reduceRecordHashes(
              acc2,
              presentationNodes[subNode.presentationNodeHash]
            ),
          acc
        );
      } else if (node.children.records.length) {
        return [
          ...acc,
          ...(node as PresentationNodeWithRecords).children.records.map(
            (record) => record.recordHash
          ),
        ];
      }

      return acc;
    };

    return reduceRecordHashes([], rootNode);
  }, [state.persistent?.presentationNodes]);

  const allItems = useMemo(
    () => Object.values(state.persistent?.items ?? {}),
    [state.persistent?.items]
  );

  const patterns = useMemo(
    () => allItems.filter((item) => item.itemType === ItemType.Pattern),
    [allItems]
  );

  const patternRecordMap = useMemo(() => {
    const patternRecords = patterns
      .map((pattern) => {
        const match = Object.values(state.persistent?.records ?? {}).find(
          (record) =>
            record.displayProperties.name === pattern.displayProperties.name &&
            patternOrCatalystRecordHashes?.includes(record.hash)
        );

        if (!match) {
          logInfo(
            `Could not find record for pattern "${pattern.displayProperties.name}"`
          );
        }

        return [pattern.hash, match?.hash];
      }) // eslint-disable-next-line @typescript-eslint/ban-types
      .filter(
        (record): record is [number, number] => typeof record[1] === 'number'
      );

    return Object.fromEntries(patternRecords);
  }, [patternOrCatalystRecordHashes, patterns, state.persistent?.records]);

  const patternsWithCompletion = useMemo(() => {
    return patterns
      .map<PatternWithCompletion | null>((pattern) => {
        const recordHash = patternRecordMap[pattern.hash];

        if (!recordHash) {
          return null;
        }

        const objectives =
          profile?.profileRecords.data.records[recordHash]?.objectives;
        const complete = objectives?.every((objective) => objective.complete);

        return {
          ...pattern,
          objectives,
          complete,
        };
      })
      .filter(exists);
  }, [patternRecordMap, patterns, profile?.profileRecords.data.records]);

  const ungroupedPatternsWithCompletion = useMemo(() => {
    return patternsWithCompletion.filter(
      (pattern) => !GROUPED_PATTERNS.includes(pattern.hash)
    );
  }, [patternsWithCompletion]);

  const groupsWithCompletion = useMemo(() => {
    if (!isClientRender || !patternsWithCompletion.length) {
      return [];
    }

    return GROUPINGS.map((group) => ({
      ...group,
      groups: group.groups.map((subGroup) => ({
        ...subGroup,
        items: subGroup.items.map((item) => {
          const patternWithCompletion = patternsWithCompletion.find(
            (pattern) => pattern.hash === item.patternHash
          );

          if (!patternWithCompletion) {
            logInfo(`Could not find pattern for hash "${item.patternHash}"`);
          }

          return {
            ...item,
            patternWithCompletion,
          };
        }),
      })),
    }));
  }, [isClientRender, patternsWithCompletion]);

  const shouldRenderLoading =
    !isClientRender || !state.dbInitialized || manifestLoadingState !== false;

  return (
    <>
      <Navbar
        reAuth={reAuth}
        clearAuth={clearAuth}
        isLoggedIn={!!state.session?.token}
        isLoggingIn={!!code}
        acquiredCount={
          patternsWithCompletion.filter((pattern) => pattern.complete).length
        }
        totalCount={patternsWithCompletion.length}
      />
      {isClientRender && authExpired && <AuthExpired reAuth={reAuth} />}
      {shouldRenderLoading && (
        <main className={styles.loading}>
          <p>
            {translate(manifestLoadingState || 'loading')}
            <LoadingDots />
          </p>
          <noscript>
            <p>{translate('javascriptDisabled')}</p>
          </noscript>
        </main>
      )}
      {!shouldRenderLoading && (
        <main className={styles.main}>
          {!state.session?.token && (
            <p className={styles.intro}>{translate('intro')}</p>
          )}
          <ul className={styles.groupList}>
            {groupsWithCompletion.map((group) => (
              <li key={group.key} className={styles.group}>
                <h1 className={styles.groupTitle}>{translate(group.key)}</h1>
                <ul className={styles.subGroupList}>
                  {group.groups.map((subGroup) => (
                    <li key={subGroup.key} className={styles.subGroup}>
                      <ul className={styles.subGroupItemList}>
                        {subGroup.items
                          .map((item) => item.patternWithCompletion)
                          .filter(exists)
                          .map((pattern) => (
                            <Pattern
                              key={pattern.hash}
                              userLoadingState={userLoadingState}
                              hasProfile={!!profile}
                              pattern={pattern}
                            />
                          ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
          <p className={styles.ungroupedTitle}>
            {translate('ungroupedWorldDrop')}
          </p>
          <ul className={styles.list}>
            {ungroupedPatternsWithCompletion.map((pattern) => (
              <Pattern
                key={pattern.hash}
                userLoadingState={userLoadingState}
                hasProfile={!!profile}
                pattern={pattern}
              />
            ))}
          </ul>
        </main>
      )}
      <Footer />
    </>
  );
};

export default Home;
