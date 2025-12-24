import ProjectListFetcher from '../components/ProjectListFetcher';

type FetchState = 'loading' | 'success' | 'empty' | 'error';

const VALID_STATES: FetchState[] = ['loading', 'success', 'empty', 'error'];

type SearchParamsInput =
  | Record<string, string | string[] | undefined>
  | Promise<Record<string, string | string[] | undefined>>;

interface ProjectsPageProps {
  searchParams?: SearchParamsInput;
}

const normalizeState = (value?: string | string[]): FetchState | undefined => {
  if (!value) {
    return undefined;
  }
  const raw = Array.isArray(value) ? value[0] : value;
  if (!raw) {
    return undefined;
  }
  const lowered = raw.toLowerCase() as FetchState;
  return VALID_STATES.includes(lowered) ? lowered : undefined;
};

export default async function Projects({ searchParams }: ProjectsPageProps) {
  const resolvedParams =
    searchParams && typeof (searchParams as Promise<unknown>).then === 'function'
      ? await searchParams
      : searchParams;
  const scenario = normalizeState(resolvedParams?.state);

  return (
    <div className="space-y-4 p-4">
      <h1 className="mb-4 text-2xl font-bold">Projects</h1>
      <p className="text-sm text-gray-400">
        Try <code className="rounded bg-gray-800 px-2 py-0.5">?state=loading|success|empty|error</code> to
        preview different states.
      </p>
      <ProjectListFetcher scenario={scenario} />
    </div>
  );
}
