# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Fixed
- **Build Process:** Resolved a critical build failure caused by incorrect component paths.
  - Relocated all React components from the `src/docs/components` directory to their proper locations within the `src` folder (e.g., `src/components`, `src/features`, `src/shared`).
  - Updated all corresponding import statements to reflect the new component locations.
  - The project now builds successfully, allowing the development server to run.
