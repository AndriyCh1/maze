Two-player in-browser game.

### How to run the app

1. **`npm run install`** at the root of each **`/frontend`** and **`/backend`** directories
2. Fill ENVs
3. **`npm run start:dev`** at the root of **`/backend`**
4. **`npm [run] start`** at the root of **`/frontend`**

#### BackEnd

For the [BackEnd](./backend) to work properly, you need to fill in the **`.env`** file. You can use the **`.env.example`** file as an example.

#### FrontEnd

For the [FrontEnd](./frontend) to work properly, you need to fill in the **`.env`** file. You can use the **`.env.example`** file as an example.

#### Predefined mazes

- [Maze 5x5](./assets/maze5x5.png)
- [Maze 10x10](./assets/maze10x10.png)

### Video demonstration

https://youtu.be/dNXYKR07k0s

### The game / What was done

The game is simple. Two players are placed into the same maze (in different locations) and should find the way out. The first player, who finds the way out, wins.
Initially, both players have no idea how the maze is structured. They are presented with a blank “canvas”, where their position is marked by a small circle. Players can navigate the maze by issuing commands to move up/down/left/right and seeing the effect of these commands on the “canvas”.
Players perform their turns in order.

### User flow

#### Opening the app

The user opens a project’s web page (React SPA). If this is a first visit, user is presented with a simple dialog asking for a name. If user already visited the app and entered the name earlier, this dialog is skipped.

Next, the user is presented with a dashboard.

#### Dashboard

The dashboard UI consists of:

● personalized greeting (Hello, <username>) on top
● list of games waiting for a second player
● New game button

#### Starting a new game

After pressing the New game button, a user is taken to the waiting screen, and the game initiated by the user appears in the dashboard’s waiting list. The information to present on a waiting screen: You started a new game <human_readable_time_interval> ago. Waiting for a second player…

#### Joining the game via the “waiting list”

The information presented in a waiting list (on a dashboard) is the date/time of a game initiation and the name of a player who initiated the game. Upon clicking on the game, the user is taken to the game page, and the game begins for both players.

#### Playing the game

The elements shown on a screen are:
● the indication of a player whose turn it currently is (Now it's your turn or Now its opponent's turn), with visual indication.
maze “canvas” with a dynamically updated map of a maze from a player’s standpoint
● “chat” (more like messages/commands log)
● movement controls
● Give up button
Exit button (initially disabled)

The “chat” consists of the log, a message input field, and a “send” button. Users can either enter movement commands (starts with a slash, there are only four supported: /up, /down, /left, /right) or messages for another player in chat (should not start with a slash). Log displays both kinds of messages with a timestamp. Commands are presented in a format (going <direction>). Player messages are prepended with a sender name (<player_name>: <message>). The log displays a scroll when messages are not fitting; also, it is auto-scrolled to the last entry upon sending a message/command.

Movement controls are just four buttons (four directions), which automatically send the corresponding movement command (so, the effect is the same as entering the movement command manually and pressing the “send” button).

A player is only able to enter movement commands in their own turn; otherwise, commands are ignored and the user gets notified about this.

After one of the players reached the exit, the “congratulations’ modal appeared and the Player X won! message is shown in the log, all further movement commands (but not the chat messages) are ignored by both players, and the Exit button becomes active.

Give up button is only shown if the game has not been finished. Upon pressing this button, the confirmation is shown, and if confirmed, both player gets the Player X gave up message in the log, all further movement commands (but not the chat messages) are ignored by both players, and the Exit button becomes active.
Upon pressing the Exit button, players are taken back to the dashboard.
