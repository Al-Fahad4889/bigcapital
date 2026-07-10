import styles from './LegalAboutPage.module.scss';

export function LegalAboutPage() {
  const sourceRepoUrl = process.env.REACT_APP_SOURCE_REPO_URL;
  const version = process.env.REACT_APP_VERSION;
  const sourceUrl = `${sourceRepoUrl}/tree/v${version}`;

  return (
    <div className={styles.legalAboutPage}>
      <h1>Legal & About</h1>

      <p>
        This application is a modified version of{' '}
        <a href="https://github.com/bigcapitalhq/bigcapital" target="_blank" rel="noopener noreferrer">
          BigCapital
        </a>
        , licensed under the GNU Affero General Public License v3.0.
      </p>

      <p>
        The complete corresponding source code for this modified version,
        including all changes, is available at:
      </p>

      <p>
        <a
          href={sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          {sourceUrl}
        </a>
      </p>

      <p>
        You may also view the full license text in the repository:{' '}
        <a
          href={`${sourceRepoUrl}/blob/v${version}/LICENSE`}
          target="_blank"
          rel="noopener noreferrer"
        >
          LICENSE
        </a>
      </p>
    </div>
  );
}