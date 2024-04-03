import React from 'react';
import i1 from './assets/1.jpg';
import i2 from './assets/2.jpg';
import i3 from './assets/3.jpg';
import i4 from './assets/4.jpg';
import i5 from './assets/5.jpg';
import i6 from './assets/6.jpg';

import app from './App.css';

const Portfolio = () => {
    return (
        <div>
            <h1>Portfolio</h1>
            <div className="projects-grid" >
                <div class="project-item">
                    <img src={i1} alt="Project 1" />
                    <p>Brief description of Project 2</p>
                </div>
                <div className="project-item">
                    <img src={i2} alt="Project 2" />
                    <p>Brief description of Project 2</p>
                </div>
                <div className="project-item">
                    <img src={i3} alt="Project 3" />
                    <p>Brief description of Project 3</p>
                </div>
                <div className="project-item">
                    <img src={i4} alt="Project 4" />
                    <p>Brief description of Project 4</p>
                </div>
                <div className="project-item">
                    <img src={i5} alt="Project 5" />
                    <p>Brief description of Project 5</p>
                </div>
                <div className="project-item">
                    <img src={i6} alt="Project 6" />
                    <p>Brief description of Project 6</p>
                </div>
            </div>
        </div>
    );
};

export default Portfolio;