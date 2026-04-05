insert into public.players (external_id, name, nationality, position, photo_url) values
('player-messi', 'Lionel Messi', 'Argentine', 'Attaquant', null),
('player-ronaldo', 'Cristiano Ronaldo', 'Portugal', 'Attaquant', null),
('player-zidane', 'Zinedine Zidane', 'France', 'Milieu', null),
('player-maldini', 'Paolo Maldini', 'Italie', 'Défenseur', null),
('player-maradona', 'Diego Maradona', 'Argentine', 'Milieu offensif', null),
('player-ronaldinho', 'Ronaldinho', 'Brésil', 'Milieu offensif', null),
('player-iniesta', 'Andrés Iniesta', 'Espagne', 'Milieu', null),
('player-henry', 'Thierry Henry', 'France', 'Attaquant', null)
on conflict (external_id) do nothing;

insert into public.matches (
  external_id, competition_external_id, competition_name, home_team_external_id, home_team_name,
  away_team_external_id, away_team_name, utc_date, status, season, stage, matchday, venue, home_score, away_score
) values
('match-001', 'wc-1986', 'Coupe du Monde', 'arg', 'Argentine', 'eng', 'Angleterre', '1986-06-22T15:00:00Z', 'FINISHED', 1986, 'Quarter-final', 1, 'Estadio Azteca', 2, 1),
('match-002', 'ucl-1999', 'UEFA Champions League', 'mun', 'Manchester United', 'bay', 'Bayern Munich', '1999-05-26T18:45:00Z', 'FINISHED', 1999, 'Final', 1, 'Camp Nou', 2, 1),
('match-003', 'wc-1998', 'Coupe du Monde', 'fra', 'France', 'bra', 'Brésil', '1998-07-12T19:00:00Z', 'FINISHED', 1998, 'Final', 1, 'Stade de France', 3, 0),
('match-004', 'ucl-2005', 'UEFA Champions League', 'liv', 'Liverpool', 'mil', 'AC Milan', '2005-05-25T18:45:00Z', 'FINISHED', 2005, 'Final', 1, 'Atatürk Olympic Stadium', 3, 3),
('match-005', 'wc-2006', 'Coupe du Monde', 'ita', 'Italie', 'fra', 'France', '2006-07-09T18:00:00Z', 'FINISHED', 2006, 'Final', 1, 'Olympiastadion', 1, 1),
('match-006', 'ucl-2009', 'UEFA Champions League', 'bar', 'FC Barcelona', 'mun', 'Manchester United', '2009-05-27T18:45:00Z', 'FINISHED', 2009, 'Final', 1, 'Stadio Olimpico', 2, 0),
('match-007', 'wc-2010', 'Coupe du Monde', 'ned', 'Pays-Bas', 'esp', 'Espagne', '2010-07-11T18:30:00Z', 'FINISHED', 2010, 'Final', 1, 'Soccer City', 0, 1),
('match-008', 'ucl-2011', 'UEFA Champions League', 'bar', 'FC Barcelona', 'mun', 'Manchester United', '2011-05-28T18:45:00Z', 'FINISHED', 2011, 'Final', 1, 'Wembley', 3, 1),
('match-009', 'wc-2014', 'Coupe du Monde', 'ger', 'Allemagne', 'arg', 'Argentine', '2014-07-13T19:00:00Z', 'FINISHED', 2014, 'Final', 1, 'Maracanã', 1, 0),
('match-010', 'ucl-2014', 'UEFA Champions League', 'rma', 'Real Madrid', 'atm', 'Atlético Madrid', '2014-05-24T18:45:00Z', 'FINISHED', 2014, 'Final', 1, 'Estádio da Luz', 4, 1),
('match-011', 'ucl-2017', 'UEFA Champions League', 'bar', 'FC Barcelona', 'psg', 'Paris Saint-Germain', '2017-03-08T19:45:00Z', 'FINISHED', 2017, 'Round of 16', 2, 'Camp Nou', 6, 1),
('match-012', 'wc-2018', 'Coupe du Monde', 'fra', 'France', 'cro', 'Croatie', '2018-07-15T15:00:00Z', 'FINISHED', 2018, 'Final', 1, 'Luzhniki Stadium', 4, 2),
('match-013', 'ucl-2019', 'UEFA Champions League', 'liv', 'Liverpool', 'bar', 'FC Barcelona', '2019-05-07T19:00:00Z', 'FINISHED', 2019, 'Semi-final', 2, 'Anfield', 4, 0),
('match-014', 'ucl-2020', 'UEFA Champions League', 'bay', 'Bayern Munich', 'bar', 'FC Barcelona', '2020-08-14T19:00:00Z', 'FINISHED', 2020, 'Quarter-final', 1, 'Estádio da Luz', 8, 2),
('match-015', 'euro-2021', 'Euro', 'ita', 'Italie', 'eng', 'Angleterre', '2021-07-11T19:00:00Z', 'FINISHED', 2021, 'Final', 1, 'Wembley', 1, 1),
('match-016', 'wc-2022', 'Coupe du Monde', 'arg', 'Argentine', 'fra', 'France', '2022-12-18T15:00:00Z', 'FINISHED', 2022, 'Final', 1, 'Lusail Stadium', 3, 3),
('match-017', 'ucl-2022', 'UEFA Champions League', 'rma', 'Real Madrid', 'mci', 'Manchester City', '2022-05-04T19:00:00Z', 'FINISHED', 2022, 'Semi-final', 2, 'Santiago Bernabéu', 3, 1),
('match-018', 'ucl-2023', 'UEFA Champions League', 'mci', 'Manchester City', 'rma', 'Real Madrid', '2023-05-17T19:00:00Z', 'FINISHED', 2023, 'Semi-final', 2, 'Etihad Stadium', 4, 0),
('match-019', 'wc-2022-sf', 'Coupe du Monde', 'arg', 'Argentine', 'cro', 'Croatie', '2022-12-13T19:00:00Z', 'FINISHED', 2022, 'Semi-final', 1, 'Lusail Stadium', 3, 0),
('match-020', 'pl-2012', 'Premier League', 'mci', 'Manchester City', 'qpr', 'QPR', '2012-05-13T14:00:00Z', 'FINISHED', 2012, 'Matchday', 38, 'Etihad Stadium', 3, 2)
on conflict (external_id) do nothing;
