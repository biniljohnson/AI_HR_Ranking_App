-- Create database
CREATE DATABASE IF NOT EXISTS recycling_hr;
USE recycling_hr;

-- Candidates table
CREATE TABLE candidates (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    years_experience INT NOT NULL,
    skills JSON NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Evaluations table
CREATE TABLE evaluations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    candidate_id INT NOT NULL,
    crisis_management_score TINYINT CHECK (crisis_management_score BETWEEN 1 AND 10),
    sustainability_score TINYINT CHECK (sustainability_score BETWEEN 1 AND 10),
    team_motivation_score TINYINT CHECK (team_motivation_score BETWEEN 1 AND 10),
    evaluated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (candidate_id) REFERENCES candidates(id) ON DELETE CASCADE
);

-- Rankings table
CREATE TABLE rankings (
    candidate_id INT PRIMARY KEY,
    total_score DECIMAL(4,2),
    rank_position INT,
    FOREIGN KEY (candidate_id) REFERENCES candidates(id) ON DELETE CASCADE
);
