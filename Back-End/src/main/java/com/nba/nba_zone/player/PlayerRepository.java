package com.nba.nba_zone.player;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * This interface represents a repository for managing Player entities.
 * It extends JpaRepository to provide CRUD (create, read, update, delete) operations and custom queries for the Player entity.
 */
@Repository //Marks the interface as a Spring Data repository
public interface PlayerRepository extends JpaRepository<Player, Long> //String is the entity's primary key (player_name) data type
{
    //Deletes a player by their name
    void deleteByPlayerName(String playerName);

    //Finds a player by their name; uses optional in case no player is found
    Optional<Player> findByPlayerName(String name);

    //Finds qualifying players based on following statistics
    List<Player> findByPointsGreaterThanEqual(Float points);
    List<Player> findByFreeThrowsGreaterThanEqual(Float free_throws);
    List<Player> findByFreeThrowPercentageGreaterThanEqual(Float free_throw_percentage);
    List<Player> findByTwoPointersGreaterThanEqual(Float two_pointers);
    List<Player> findByTwoPointPercentageGreaterThanEqual(Float two_point_percentage);
    List<Player> findByThreePointersGreaterThanEqual(Float three_pointers);
    List<Player> findByThreePointPercentageGreaterThanEqual(Float three_point_percentage);
    List<Player> findByEfficientFieldGoalPercentageGreaterThanEqual(Float efficient_field_goal_percentage);
    List<Player> findByTotalReboundsGreaterThanEqual(Float total_rebounds);
    List<Player> findByAssistsGreaterThanEqual(Float assists);
    List<Player> findByBlocksGreaterThanEqual(Float blocks);
    List<Player> findByStealsGreaterThanEqual(Float steals);
    List<Player> findByTurnoversLessThanEqual(Float turnovers);
    List<Player> findByAgeLessThanEqual(Integer age);
    List<Player> findByMinutesPlayedGreaterThanEqual(Float minutes_played);
    List<Player> findByGamesPlayedGreaterThanEqual(Integer games_played);
}