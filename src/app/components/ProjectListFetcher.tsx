'use client';

import React, { useState, useEffect } from 'react';
import { mockFetchProjects, Project, ProjectMockScenario } from '../utils/mocks';

type FetchState = 'loading' | 'success' | 'empty' | 'error';

interface ProjectListFetcherProps {
  scenario?: FetchState;
}

const ProjectListFetcher: React.FC<ProjectListFetcherProps> = ({ scenario = 'success' }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [fetchState, setFetchState] = useState<FetchState>('loading');
  const normalizedScenario: FetchState = scenario ?? 'success';

  useEffect(() => {
    let isMounted = true;

    if (normalizedScenario === 'loading') {
      setFetchState('loading');
      setProjects([]);
      return;
    }

    const scenarioForApi: ProjectMockScenario = normalizedScenario;

    const fetchData = async () => {
      setFetchState('loading');
      try {
        const data = await mockFetchProjects(scenarioForApi);
        if (!isMounted) {
          return;
        }
        setProjects(data);
        setFetchState(data.length === 0 ? 'empty' : 'success');
      } catch (err) {
        console.error(err);
        if (isMounted) {
          setFetchState('error');
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [normalizedScenario]);

  if (fetchState === 'loading') {
    return (
      <div className="p-4 text-center">
        <p>Loading projects... ⏳</p>
      </div>
    );
  }

  if (fetchState === 'error') {
    return (
      <div className="p-4 text-center text-red-500">
        <p>An error occurred while fetching projects. 😢</p>
      </div>
    );
  }

  if (fetchState === 'empty') {
    return (
      <div className="p-4 text-center text-gray-500">
        <p>No projects found. Try a different scenario. 🗂️</p>
      </div>
    );
  }

  if (fetchState === 'success') {
    return (
      <div className="p-4">
        <h2 className="mb-4 text-xl font-semibold">Available Projects:</h2>
        <ul className="list-disc pl-5">
          {projects.map((project) => (
            <li key={project.id} className="mb-2">
              {project.name} - ${project.budget.toLocaleString()}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return null;
};

export default ProjectListFetcher;
