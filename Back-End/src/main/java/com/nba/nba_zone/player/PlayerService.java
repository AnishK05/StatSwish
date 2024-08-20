package com.nba.nba_zone.player;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/** Spring annotation that marks a java class as a component.
 * Tells spring that this class should be managed by the Spring container.
 * Spring will create an instance of this class and manage its life cycle.
 * */
@Component
public class PlayerService
{
    private final PlayerRepository playerRepository;

    @Autowired
    public PlayerService(PlayerRepository playerRepository)
    {
        this.playerRepository = playerRepository;
    }

    public List<Player> getPlayers()
    {
        return playerRepository.findAll();
    }

    public List<Player> getPlayersFromTeam(String searchText)
    {
        return playerRepository.findAll().stream()
                .filter(player -> player.getTeam().toLowerCase().contains(searchText.toLowerCase()))
                .collect(Collectors.toList());
    }

    public List<Player> getPlayersByName(String searchText)
    {
        return playerRepository.findAll().stream()
                .filter(player -> player.getPlayer_name().toLowerCase().contains(searchText.toLowerCase()))
                .collect(Collectors.toList());
    }

    public List<Player> getPlayersByPosition(String searchText)
    {
        return playerRepository.findAll().stream()
                .filter(player -> player.getPosition().toLowerCase().contains(searchText.toLowerCase()))
                .collect(Collectors.toList());
    }

    public List<Player> getPlayersByTeamAndPosition(String searchTextT, String searchTextP)
    {
        return playerRepository.findAll().stream()
                .filter(player -> player.getTeam().toLowerCase().contains(searchTextT.toLowerCase()) &&
                        player.getPosition().toLowerCase().contains(searchTextP.toLowerCase()))
                .collect(Collectors.toList());
    }

    //Get players by statistics

    public List<Player> getPlayersByPoints(Float minPoints) {
        return playerRepository.findByPointsGreaterThanEqual(minPoints);
    }

    public List<Player> getPlayersByFreeThrows(Float minFreeThrows) {
        return playerRepository.findByFreeThrowsGreaterThanEqual(minFreeThrows);
    }

    public List<Player> getPlayersByFreeThrowPercentage(Float minFreeThrowPercentage) {
        return playerRepository.findByFreeThrowPercentageGreaterThanEqual(minFreeThrowPercentage);
    }

    public List<Player> getPlayersByTwoPointers(Float minTwoPointers) {
        return playerRepository.findByTwoPointersGreaterThanEqual(minTwoPointers);
    }

    public List<Player> getPlayersByTwoPointPercentage(Float minTwoPointPercentage) {
        return playerRepository.findByTwoPointPercentageGreaterThanEqual(minTwoPointPercentage);
    }

    public List<Player> getPlayersByThreePointers(Float minThreePointers) {
        return playerRepository.findByThreePointersGreaterThanEqual(minThreePointers);
    }

    public List<Player> getPlayersByThreePointPercentage(Float minThreePointPercentage) {
        return playerRepository.findByThreePointPercentageGreaterThanEqual(minThreePointPercentage);
    }

    public List<Player> getPlayersByEfficientFieldGoalPercentage(Float minEfficientFieldGoalPercentage) {
        return playerRepository.findByEfficientFieldGoalPercentageGreaterThanEqual(minEfficientFieldGoalPercentage);
    }

    public List<Player> getPlayersByTotalRebounds(Float minTotalRebounds) {
        return playerRepository.findByTotalReboundsGreaterThanEqual(minTotalRebounds);
    }

    public List<Player> getPlayersByAssists(Float minAssists) {
        return playerRepository.findByAssistsGreaterThanEqual(minAssists);
    }

    public List<Player> getPlayersByBlocks(Float minBlocks) {
        return playerRepository.findByBlocksGreaterThanEqual(minBlocks);
    }

    public List<Player> getPlayersBySteals(Float minSteals) {
        return playerRepository.findByStealsGreaterThanEqual(minSteals);
    }

    public List<Player> getPlayersByTurnovers(Float maxTurnovers) {
        return playerRepository.findByTurnoversLessThanEqual(maxTurnovers);
    }

    public List<Player> getPlayersByAge(Integer maxAge) {
        return playerRepository.findByAgeLessThanEqual(maxAge);
    }

    public List<Player> getPlayersByMinutesPlayed(Float minMinutesPlayed) {
        return playerRepository.findByMinutesPlayedGreaterThanEqual(minMinutesPlayed);
    }

    public List<Player> getPlayersByGamesPlayed(Integer minGamesPlayed) {
        return playerRepository.findByGamesPlayedGreaterThanEqual(minGamesPlayed);
    }

    public Player addPlayer(Player player)
    {
        playerRepository.save(player);
        return player;
    }

    public Player updatePlayer(Long id, Player updatedPlayer)
    {
        Optional<Player> existingPlayer = playerRepository.findById(id);

        if (existingPlayer.isPresent())
        {
            Player playerToUpdate = existingPlayer.get();
            playerToUpdate.setPlayer_name(updatedPlayer.getPlayer_name());
            playerToUpdate.setTeam(updatedPlayer.getTeam());
            playerToUpdate.setPosition(updatedPlayer.getPosition());

            playerRepository.save(playerToUpdate);
            return playerToUpdate;
        }
        return null;
    }

    @Transactional
    public void deletePlayer(Long id)
    {
        playerRepository.deleteById(id);
    }
}