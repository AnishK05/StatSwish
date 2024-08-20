package com.nba.nba_zone.player;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController // Marks the class as a Spring MVC (model-view controller)
@RequestMapping(path = "api/v1/player")
public class PlayerController
{
    private final PlayerService playerService;

    @Autowired
    public PlayerController(PlayerService playerService)
    {
        this.playerService = playerService;
    }

    @GetMapping
    public List<Player> getPlayers(
            @RequestParam(required = false) String team,
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String position,
            @RequestParam(required = false) Float points,
            @RequestParam(required = false) Float freeThrows,
            @RequestParam(required = false) Float freeThrowPercentage,
            @RequestParam(required = false) Float twoPointers,
            @RequestParam(required = false) Float twoPointPercentage,
            @RequestParam(required = false) Float threePointers,
            @RequestParam(required = false) Float threePointPercentage,
            @RequestParam(required = false) Float efficientFieldGoalPercentage,
            @RequestParam(required = false) Float totalRebounds,
            @RequestParam(required = false) Float assists,
            @RequestParam(required = false) Float blocks,
            @RequestParam(required = false) Float steals,
            @RequestParam(required = false) Float turnovers,
            @RequestParam(required = false) Integer age,
            @RequestParam(required = false) Float minutesPlayed,
            @RequestParam(required = false) Integer gamesPlayed ) {

        if (team != null && position != null) {
            return playerService.getPlayersByTeamAndPosition(team, position);
        }
        else if (team != null) {
            return playerService.getPlayersFromTeam(team);
        }
        else if (name != null) {
            return playerService.getPlayersByName(name);
        }
        else if (position != null) {
            return playerService.getPlayersByPosition(position);
        }
        else if (points != null) {
            return playerService.getPlayersByPoints(points);
        }
        else if (freeThrows != null) {
            return playerService.getPlayersByFreeThrows(freeThrows);
        }
        else if (freeThrowPercentage != null) {
            return playerService.getPlayersByFreeThrowPercentage(freeThrowPercentage);
        }
        else if (twoPointers != null) {
            return playerService.getPlayersByTwoPointers(twoPointers);
        }
        else if (twoPointPercentage != null) {
            return playerService.getPlayersByTwoPointPercentage(twoPointPercentage);
        }
        else if (threePointers != null) {
            return playerService.getPlayersByThreePointers(threePointers);
        }
        else if (threePointPercentage != null) {
            return playerService.getPlayersByThreePointPercentage(threePointPercentage);
        }
        else if (efficientFieldGoalPercentage != null) {
            return playerService.getPlayersByEfficientFieldGoalPercentage(efficientFieldGoalPercentage);
        }
        else if (totalRebounds != null) {
            return playerService.getPlayersByTotalRebounds(totalRebounds);
        }
        else if (assists != null) {
            return playerService.getPlayersByAssists(assists);
        }
        else if (blocks != null) {
            return playerService.getPlayersByBlocks(blocks);
        }
        else if (steals != null) {
            return playerService.getPlayersBySteals(steals);
        }
        else if (turnovers != null) {
            return playerService.getPlayersByTurnovers(turnovers);
        }
        else if (age != null) {
            return playerService.getPlayersByAge(age);
        }
        else if (minutesPlayed != null) {
            return playerService.getPlayersByMinutesPlayed(minutesPlayed);
        }
        else if (gamesPlayed != null) {
            return playerService.getPlayersByGamesPlayed(gamesPlayed);
        }
        else {
            return playerService.getPlayers();
        }
    }

    @PostMapping //Handles HTTP post requests to add new players to database
    public ResponseEntity<Player> addPlayer(@RequestBody Player player)
    {
        Player createdPlayer = playerService.addPlayer(player);
        return new ResponseEntity<>(createdPlayer, HttpStatus.CREATED);
    }

    @PutMapping("/{id}") //Handles HTTP put requests to update players
    public ResponseEntity<Player> updatePlayer(@PathVariable Long id, @RequestBody Player player)
    {
        Player resultPlayer = playerService.updatePlayer(id, player);
        if (resultPlayer != null)
        {
            return new ResponseEntity<>(resultPlayer, HttpStatus.OK);
        }
        else
        {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}") //Handles HTTP requests to delete players by their ID
    public ResponseEntity<String> deletePlayer(@PathVariable Long id)
    {
        playerService.deletePlayer(id);
        return new ResponseEntity<>("Player Deleted Successfully", HttpStatus.OK);
    }
}