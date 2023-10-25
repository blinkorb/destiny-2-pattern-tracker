import { useIsClientRender, useLocation, useRouter } from '@blinkorb/resolute';
import classNames from 'classnames';
import queryString from 'query-string';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { v4 as uuid } from 'uuid';

import LoadingDots from './components/loading-dots.js';
import {
  MANIFEST_TIMEOUT,
  POLLING_INTERVAL,
  ROOT_PRESENTATION_NODE_HASH,
  SessionStore,
} from './constants.js';
import { useStateContext } from './context.js';
import { TranslationKey, useTranslate } from './translations.js';
import {
  APIErrorCode,
  APIResponse,
  ComponentType,
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
import { logError, logInfo } from './utils.js';

const useStyles = createUseStyles((theme) => ({
  loading: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  main: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
  },
  list: {
    display: 'flex',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: 0,
    margin: 0,
    gap: 8,
  },
  listItem: {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    padding: 0,
    margin: 0,
    '&:hover $listTextWrapper': {
      display: 'flex',
    },
  },
  listIcon: {
    width: 48,
    height: 48,
    '@media all and (min-width: 768px)': {
      width: 72,
      height: 72,
    },
  },
  listTextWrapper: {
    display: 'none',
    position: 'absolute',
    width: 200,
    top: '100%',
    left: 0,
    flexDirection: 'column',
    padding: 8,
    backgroundColor: theme.BLACK,
    zIndex: 3,
    pointerEvents: 'none',
  },
  listTitle: {
    fontSize: 16,
    margin: 0,
  },
  listFlavor: {
    fontSize: 12,
    margin: 0,
  },
  border: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    border: '1px solid',
    borderColor: theme.GRAY_LIGHTEST,
    zIndex: 1,
  },
  borderComplete: {
    borderColor: theme.YELLOW,
  },
  progress: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    padding: 2,
    zIndex: 2,
    color: theme.WHITE,
    fontSize: 14,
  },
  progressComplete: {
    color: theme.YELLOW,
  },
  hideSmall: {
    display: 'none',
    '@media all and (min-width: 768px)': {
      display: 'initial',
    },
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
  const [userLoadingState, setUserLoadingState] = useState<boolean>(true);
  const [manifestLoadingState, setManifestLoadingState] = useState<
    false | TranslationKey
  >('loadingManifest');
  const [profile, setProfile] = useState<ProfileResponse>();

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

  useEffect(() => {
    if (!isClientRender) {
      return;
    }

    if (!state.session?.token && !code) {
      reAuth();
    }
  }, [code, isClientRender, reAuth, state.session?.token]);

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
            reAuth();
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
            reAuth();
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
      setProfile(profileResponse);
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
      const { meta, manifest, items, records, presentationNodes } =
        state.persistent ?? {};

      if (
        meta &&
        manifest &&
        items &&
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

      const nextItems =
        meta &&
        items &&
        manifest?.version === nextManifest.version &&
        meta.manifestLanguage === state.language
          ? items
          : await fetch(
              `${process.env.CLIENT_API_URL}${
                nextManifest.jsonWorldComponentContentPaths[state.language]
                  .DestinyInventoryItemDefinition
              }`
            ).then<ItemsResponse>(async (response) => {
              if (response.ok) {
                return JSON.parse(await response.text());
              }

              try {
                return JSON.parse(await response.text());
              } catch (error) {
                logError(error);

                throw new Error('Failed to request items');
              }
            });

      setManifestLoadingState('loadingRecords');

      const nextRecords =
        meta &&
        records &&
        manifest?.version === nextManifest.version &&
        meta.manifestLanguage === state.language
          ? records
          : await fetch(
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
            });

      setManifestLoadingState('loadingPresentationNodes');

      const nextPresentationNodes =
        meta &&
        presentationNodes &&
        manifest?.version === nextManifest.version &&
        meta.manifestLanguage === state.language
          ? presentationNodes
          : await fetch(
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
            });

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
      .filter((item): item is Exclude<typeof item, null> => !!item);
  }, [patternRecordMap, patterns, profile?.profileRecords.data.records]);

  const shouldRenderLoading =
    !isClientRender || !state.dbInitialized || manifestLoadingState !== false;

  return (
    <>
      {shouldRenderLoading && (
        <main className={styles.loading}>
          <p>
            {translate(manifestLoadingState || 'loading')}
            <LoadingDots />
          </p>
        </main>
      )}
      <noscript>
        <p>Javascript is disabled. This site requires Javascript to run.</p>
      </noscript>
      {!shouldRenderLoading && (
        <main>
          {state.persistent?.items && (
            <p>
              {
                patternsWithCompletion.filter((pattern) => pattern.complete)
                  .length
              }
              /{patternsWithCompletion.length}
            </p>
          )}
          <ul className={styles.list}>
            {patternsWithCompletion.map((pattern) => (
              <li key={pattern.hash} className={styles.listItem}>
                {pattern.displayProperties.hasIcon && (
                  <img
                    className={styles.listIcon}
                    src={`${process.env.CLIENT_API_URL}${pattern.displayProperties.icon}`}
                  />
                )}

                <div
                  className={classNames(styles.border, {
                    [styles.borderComplete]: pattern.complete,
                  })}
                />

                {userLoadingState ? (
                  <div className={styles.progress}>
                    <span className={styles.hideSmall}>
                      {translate('loading')}
                    </span>
                    <LoadingDots />
                  </div>
                ) : (
                  pattern.objectives && (
                    <div
                      className={classNames(styles.progress, {
                        [styles.progressComplete]: pattern.complete,
                      })}
                    >
                      {pattern.objectives.map((objective) => (
                        <>
                          {objective.progress}/{objective.completionValue}
                        </>
                      ))}
                    </div>
                  )
                )}
                <div className={styles.listTextWrapper}>
                  <p className={styles.listTitle}>
                    {pattern.displayProperties.name}
                  </p>
                  <p className={styles.listFlavor}>{pattern.flavorText}</p>
                </div>
              </li>
            ))}
          </ul>
        </main>
      )}
    </>
  );
};

export default Home;
