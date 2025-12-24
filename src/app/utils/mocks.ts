export interface Project {
  id: number;
  name: string;
  budget: number;
}

export type ProjectMockScenario = 'success' | 'empty' | 'error';

/**
 * Simulates fetching projects from an API with togglable scenarios.
 */
export const mockFetchProjects = (
  scenario: ProjectMockScenario = 'success',
): Promise<Project[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (scenario === 'error') {
        reject(new Error('Unable to fetch projects right now.'));
        return;
      }

      if (scenario === 'empty') {
        resolve([]);
        return;
      }

      const mockData: Project[] = [
        { id: 1, name: 'Marketing Website Revamp', budget: 25000 },
        { id: 2, name: 'Internal Tools Upgrade', budget: 40000 },
        { id: 3, name: 'Mobile App Prototype', budget: 18000 },
      ];
      resolve(mockData);
    }, 1500);
  });
};
