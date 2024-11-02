import React, { useEffect, useState } from 'react';
import ProjectCard from './components/ProjectCard';
import projectsData from './projects.json';

// Charger toutes les images du dossier assets/projects
const images = require.context('./assets/projects', false, /\.(jpg|png|jpeg|gif)$/);

const Home = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Ajouter les images correspondantes aux données JSON
    const projectsWithImages = projectsData.map(project => ({
      ...project,
      image: images(`./${project.image}`)
    }));

    // Trier les projets par ordre alphabétique de 'theme'
    projectsWithImages.sort((a, b) => a.theme.localeCompare(b.theme));

    // Mettre à jour le state avec les projets triés
    setProjects(projectsWithImages);
  }, []);

  return (
    <div className="home-page">
      <h1>MON PORTEFOLIO DE PROJETS</h1>
      <div className="project-cards-container">
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            theme={project.theme}
            title={project.title}
            description={project.description}
            image={project.image}
            link={project.link}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;