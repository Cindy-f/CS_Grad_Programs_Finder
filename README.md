# CS Grad Programs Finder

A filterable web application that lets prospective students explore and compare Computer Science graduate programs (M.S. and PhD) by institution, tuition, research area, deadlines, rankings, and more.

---

## Table of Contents

1. [Project Overview](#project-overview)  
2. [Features](#features)  
3. [Tech Stack](#tech-stack)  
4. [Prerequisites](#prerequisites)  
5. [Installation](#installation)  
   - [Back-End Setup](#back-end-setup)  
   - [Front-End Setup](#front-end-setup)  
6. [Configuration](#configuration)  
7. [Usage](#usage)  
   - [Running the API](#running-the-api)  
   - [Running the Front-End](#running-the-front-end)  
   - [Available Filters & Endpoints](#available-filters--endpoints)  
8. [Folder Structure](#folder-structure)  
9. [Environment Variables](#environment-variables)  
10. [Deployment](#deployment)  
11. [Contributing](#contributing)  
12. [License](#license)  
13. [Contact](#contact)

---

## Project Overview

**CS Grad Programs Finder** is a full-stack web application that aggregates data on Computer Science Master’s and PhD programs across various US universities. Users can filter by degree type, location (state), tuition, research area, application deadline, ranking, and more. The back-end provides a RESTful API built with Node.js + Express and PostgreSQL; the front-end is a React + Tailwind CSS single-page app.

> **Use Case:** A prospective graduate student wants to quickly narrow down programs that match their criteria—e.g., PhD programs in Texas focused on “Systems” with deadlines before November 1, 2025, and tuition under \$20,000 (in-state). This tool returns all matching programs in a responsive, card-based layout.

---

## Features

- **Filterable Program Listings:**  
  - Degree type (M.S. or PhD)  
  - Location (city, state, country)  
  - Tuition ranges (in-state / out-of-state)  
  - Research areas (AI, Systems, Theory, etc.)  
  - Application deadlines  
  - Program rankings  

- **Responsive UI:**  
  - Mobile-friendly sidebar filters  
  - Grid layout of program cards on desktop/tablet  

- **RESTful API:**  
  - `GET /api/programs` with query parameters for dynamic filtering  
  - Metadata endpoints for research areas and states (e.g., `GET /api/metadata/researchAreas`)  

- **Data Management:**  
  - PostgreSQL schema with normalized research areas and many-to-many relationships  
  - Sequelize ORM for easy migrations and model definitions  

- **Extensible & Maintainable:**  
  - Clear separation of concerns (models, controllers, routes)  
  - Easily add new filters (e.g., funding options, GRE requirements)  
  - Admin interface (optional) can be added via Django Admin or a simple CRUD in Express  

---

## Tech Stack

- **Back-End:**  
  - Node.js (v16+)  
  - Express.js (v4+)  
  - Sequelize ORM  
  - PostgreSQL (v13+)  

- **Front-End:**  
  - React (v18+)  
  - Tailwind CSS (v3+)  
  - Axios (for HTTP requests)  

- **Deployment (examples):**  
  - Heroku / Render / AWS RDS for PostgreSQL  
  - Netlify / Vercel for static React site  

---

## Prerequisites

Before you begin, make sure you have the following installed:

- **Node.js** (v16 or later) and **npm** (or yarn)  
- **PostgreSQL** (local installation or remote DB credentials)  
- **Git** (for version control)  

---

## Installation

Clone the repository and follow the steps below to get both the API and front-end running locally.

```bash
git clone https://github.com/yourusername/CS_Grad_Programs_Finder.git
cd cs-grad-programs-finder
