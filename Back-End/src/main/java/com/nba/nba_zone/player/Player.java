package com.nba.nba_zone.player;
import jakarta.persistence.*;

//Download following dependencies during spring.start.io: Spring Web, Spring Data JPA, PostgreSQL Driver

@Entity //Allows us to declare this as JPA Entity (java class that can be mapped to database tables)
@Table(name="player_statistic") //Name of data table being used
public class Player
{
    //Variables for each statistic in data table

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-generate the id value
    @Column(name="id")
    private Long id;

    @Column(name="player_name") //Tells Spring Boot where to find player_name in PostgresSQL database
    private String playerName;

    @Column(name="position")
    private String position;

    @Column(name="age")
    private Integer age;

    @Column(name="team")
    private String team;

    @Column(name="games")
    private Integer gamesPlayed;

    @Column(name="games_started")
    private Integer gamesStarted;

    @Column(name="minutes_played")
    private Float minutesPlayed;

    @Column(name="field_goals")
    private Float fieldGoals;

    @Column(name="field_goal_attempts")
    private Float fieldGoalAttempts;

    @Column(name="field_goal_percentage")
    private Float fieldGoalPercentage;

    @Column(name="three_pointers")
    private Float threePointers;

    @Column(name="three_point_attempts")
    private Float threePointAttempts;

    @Column(name="three_point_percentage")
    private Float threePointPercentage;

    @Column(name="two_pointers")
    private Float twoPointers;

    @Column(name="two_point_attempts")
    private Float twoPointAttempts;

    @Column(name="two_point_percentage")
    private Float twoPointPercentage;

    @Column(name="efficient_field_goal_percentage")
    private Float efficientFieldGoalPercentage;

    @Column(name="free_throws")
    private Float freeThrows;

    @Column(name="free_throw_attempts")
    private Float freeThrowAttempts;

    @Column(name="free_throw_percentage")
    private Float freeThrowPercentage;

    @Column(name="offensive_rebounds")
    private Float offensiveRebounds;

    @Column(name="defensive_rebounds")
    private Float defensiveRebounds;

    @Column(name="total_rebounds")
    private Float totalRebounds;

    @Column(name="assists")
    private Float assists;

    @Column(name="steals")
    private Float steals;

    @Column(name="blocks")
    private Float blocks;

    @Column(name="turnovers")
    private Float turnovers;

    @Column(name="personal_fouls")
    private Float personalFouls;

    @Column(name="points")
    private Float points;

    //Constructor with no parameters
    public Player()
    {

    }

    //Constructor with all parameters (generated with Intelli J)
    public Player(Long id, String player_name, String position, Integer age, String team, Integer games_played, Integer games_started, Float minutes_per_game, Float field_goals, Float field_goal_attempts, Float field_goal_percentage, Float three_pointers, Float three_point_attempts, Float three_point_percentage, Float two_pointers, Float two_point_attempts, Float two_point_percentage, Float efficient_field_goal_percentage, Float free_throws, Float free_throw_attempts, Float free_throw_percentage, Float offensive_rebounds, Float defensive_rebounds, Float total_rebounds, Float assists, Float steals, Float blocks, Float turnovers, Float personal_fouls, Float points)
    {
        this.id = id;
        this.playerName = player_name;
        this.position = position;
        this.age = age;
        this.team = team;
        this.gamesPlayed = games_played;
        this.gamesStarted = games_started;
        this.minutesPlayed = minutes_per_game;
        this.fieldGoals = field_goals;
        this.fieldGoalAttempts = field_goal_attempts;
        this.fieldGoalPercentage = field_goal_percentage;
        this.threePointers = three_pointers;
        this.threePointAttempts = three_point_attempts;
        this.threePointPercentage = three_point_percentage;
        this.twoPointers = two_pointers;
        this.twoPointAttempts = two_point_attempts;
        this.twoPointPercentage = two_point_percentage;
        this.efficientFieldGoalPercentage = efficient_field_goal_percentage;
        this.freeThrows = free_throws;
        this.freeThrowAttempts = free_throw_attempts;
        this.freeThrowPercentage = free_throw_percentage;
        this.offensiveRebounds = offensive_rebounds;
        this.defensiveRebounds = defensive_rebounds;
        this.totalRebounds = total_rebounds;
        this.assists = assists;
        this.steals = steals;
        this.blocks = blocks;
        this.turnovers = turnovers;
        this.personalFouls = personal_fouls;
        this.points = points;
    }

    //Constructor with player_name parameter
    public Player(String player_name)
    {
        this.playerName = player_name;
    }

    //Getter and Setter Methods (generated with Intelli J)

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPlayer_name() {
        return playerName;
    }

    public void setPlayer_name(String player_name) {
        this.playerName = player_name;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public String getTeam() {
        return team;
    }

    public void setTeam(String team) {
        this.team = team;
    }

    public Integer getGames_played() {
        return gamesPlayed;
    }

    public void setGames_played(Integer games_played) {
        this.gamesPlayed = games_played;
    }

    public Integer getGames_started() {
        return gamesStarted;
    }

    public void setGames_started(Integer games_started) {
        this.gamesStarted = games_started;
    }

    public Float getMinutes_per_game() {
        return minutesPlayed;
    }

    public void setMinutes_per_game(Float minutes_per_game) {
        this.minutesPlayed = minutes_per_game;
    }

    public Float getField_goals() {
        return fieldGoals;
    }

    public void setField_goals(Float field_goals) {
        this.fieldGoals = field_goals;
    }

    public Float getField_goal_attempts() {
        return fieldGoalAttempts;
    }

    public void setField_goal_attempts(Float field_goal_attempts) {
        this.fieldGoalAttempts = field_goal_attempts;
    }

    public Float getField_goal_percentage() {
        return fieldGoalPercentage;
    }

    public void setField_goal_percentage(Float field_goal_percentage) {
        this.fieldGoalPercentage = field_goal_percentage;
    }

    public Float getThreePointers() {
        return threePointers;
    }

    public void setThreePointers(Float threePointers) {
        this.threePointers = threePointers;
    }

    public Float getThreePointAttempts() {
        return threePointAttempts;
    }

    public void setThreePointAttempts(Float threePointAttempts) {
        this.threePointAttempts = threePointAttempts;
    }

    public Float getThreePointPercentage() {
        return threePointPercentage;
    }

    public void setThreePointPercentage(Float threePointPercentage) {
        this.threePointPercentage = threePointPercentage;
    }

    public Float getTwoPointers() {
        return twoPointers;
    }

    public void setTwoPointers(Float twoPointers) {
        this.twoPointers = twoPointers;
    }

    public Float getTwoPointAttempts() {
        return twoPointAttempts;
    }

    public void setTwoPointAttempts(Float twoPointAttempts) {
        this.twoPointAttempts = twoPointAttempts;
    }

    public Float getTwoPointPercentage() {
        return twoPointPercentage;
    }

    public void setTwoPointPercentage(Float twoPointPercentage) {
        this.twoPointPercentage = twoPointPercentage;
    }

    public Float getEfficientFieldGoalPercentage() {
        return efficientFieldGoalPercentage;
    }

    public void setEfficientFieldGoalPercentage(Float efficientFieldGoalPercentage) {
        this.efficientFieldGoalPercentage = efficientFieldGoalPercentage;
    }

    public Float getFreeThrows() {
        return freeThrows;
    }

    public void setFreeThrows(Float freeThrows) {
        this.freeThrows = freeThrows;
    }

    public Float getFreeThrowAttempts() {
        return freeThrowAttempts;
    }

    public void setFreeThrowAttempts(Float freeThrowAttempts) {
        this.freeThrowAttempts = freeThrowAttempts;
    }

    public Float getFreeThrowPercentage() {
        return freeThrowPercentage;
    }

    public void setFreeThrowPercentage(Float freeThrowPercentage) {
        this.freeThrowPercentage = freeThrowPercentage;
    }

    public Float getOffensiveRebounds() {
        return offensiveRebounds;
    }

    public void setOffensiveRebounds(Float offensiveRebounds) {
        this.offensiveRebounds = offensiveRebounds;
    }

    public Float getDefensive_rebounds() {
        return defensiveRebounds;
    }

    public void setDefensive_rebounds(Float defensive_rebounds) {
        this.defensiveRebounds = defensive_rebounds;
    }

    public Float getTotalRebounds() {
        return totalRebounds;
    }

    public void setTotalRebounds(Float totalRebounds) {
        this.totalRebounds = totalRebounds;
    }

    public Float getAssists() {
        return assists;
    }

    public void setAssists(Float assists) {
        this.assists = assists;
    }

    public Float getSteals() {
        return steals;
    }

    public void setSteals(Float steals) {
        this.steals = steals;
    }

    public Float getBlocks() {
        return blocks;
    }

    public void setBlocks(Float blocks) {
        this.blocks = blocks;
    }

    public Float getTurnovers() {
        return turnovers;
    }

    public void setTurnovers(Float turnovers) {
        this.turnovers = turnovers;
    }

    public Float getPersonalFouls() {
        return personalFouls;
    }

    public void setPersonalFouls(Float personalFouls) {
        this.personalFouls = personalFouls;
    }

    public Float getPoints() {
        return points;
    }

    public void setPoints(Float points) {
        this.points = points;
    }
}