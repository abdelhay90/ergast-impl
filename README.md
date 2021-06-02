# Ergast
This solution is built with `create-react-app` with `Typesctipt` template. it designed to consume the ergast rest API.

## Features
- It is a `react` application.
- It used `Typescript` template of `create-react-app`.
- It uses the `prettier` and `eslint` for linting.
- It uses `antd` as UI library and design language material.
- It is simple UI and display data as tabular data and also the maps to pin the race location.
- It detect the world champion in each season and highlight him in each race.

## Installation
- Run `yarn`.
- To start App run `yarn start`.
- In `.env`, you can change port number and map API key.

## What is done
- The app built with `react` using `antd` UI library (header - content- footer).
- Season selector from `2005` to `current year`.
- Table for races of the season with expandable rows contains the winners list of each race.
- An area displays the top three drivers standings in each season and mark them with icon.
- Highlight the top driver in each season in the race winners view.
- A popover displays a map with the location of each race.
