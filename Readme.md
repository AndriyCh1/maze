Two-player in-browser game.

### Video demonstration

https://youtu.be/dNXYKR07k0s

### The game / What was done

The game is simple. Two players placed into the same maze (in different locations) and should find the way out. The first player, who finds the way out, wins.
Initially, both players have no idea how the maze is structured. They are presented with a blank “canvas”, where their position is marked by a small circle. Player can navigate the maze by issuing a commands to move up/down/left/right and seeing the effect of these commands on the “canvas”.
Players perform their turns in order.

### User flow

#### Opening the app

User opens a project’s web page (React SPA). If this is a first visit, user is presented with a simple dialog asking for a name. If user already visited the app and entered the name earlier, this dialog is skipped.

Next, user is presented with a dashboard.

#### Dashboard

The dashboard UI consists of:

● personalized greeting (Hello, <username>) on top
● list of games waiting for a second player
● New game button

#### Starting a new game

After pressing the New game button, user is taken on the waiting screen, and the game initiated by the user, appears in the dashboard’s waiting list. The information to present on a waiting screen: You started a new game <human_readable_time_interval> ago. Waiting for a second player…

#### Joining the game via the “waiting list”

The information presented in a waiting list (on a dashboard) is: date/time of a game initiation and the name of a player who initiated the game. Upon clicking on the game, user is taken into the game page, and the game begins for both players.

#### Playing the game

The elements showed on a screen are:
● the indication of a player whose turn it currently is (Now its your turn or Now its opponent's turn), with visual indication.
maze “canvas” with a dynamically updated map of a maze from a player’s standpoint
● “chat” (more like messages/commands log)
● movement controls
● Give up button
Exit button (initially disabled)

The “chat” consists of the log, message input field and a “send” button. User can either enter movement commands (starts with slash, there are only four supported: /up, /down, /left, /right) or messages for other player in chat (should not start with slash). Log displays both kind of messages with a timestamp. Commands are presented in a format (going <direction>). Player messages prepended with a sender name (<player_name>: <message>). Log displays a scroll when messages are not fitting; also, it is auto-scrolled to the last entry upon sending a message/command.

Movement controls are just four buttons (four directions), which automatically send the corresponding movement command (so, effect is the same as entering the movement command manually and pressing the “send” button).

Player is only able to enter movement commands in their own turn; otherwise commands are ignored and user gets notified about this.

After one of the players reached the exit, the “congratulations’ modal appears and the Player X has won! message is shown in log, all further movement commands (but not the chat messages) are ignored from both players, and the Exit button becomes active.

Give up button is only shown if the game has not been finished. Upon pressing this button, the confirmation is shown, and if confirmed, both player gets the Player X gave up message in the log, all further movement commands (but not the chat messages) are ignored from both players, and the Exit button becomes active.
Upon pressing the Exit button, player are taken back to dashboard.

### Technical details

- [x] application should consist of web-client (React SPA) and web-server (Node.js application)
- [x] using Nest.js for a web-server would be a plus
- [x] using TypeScript would be a plus
- [x] nice looking UI would be a plus
- [x] the game flow should be managed by server (so clients won’t be able to manipulate the game to their advantage)
- [ ] creating a mechanism to generate good mazes dynamically (with customizable size and fair player placement) will be a big plus
- [x] to simplify player authentication it is OK to store player session information in local storage
- [ ] handling players “lost connection” (for example, closed browser tab) would be a plus
- [x] the maze “canvas” is not necessarily an HTML Canvas element; you can use what you think will work best (DOM elements, SVG, etc.)

#### Extra (bonus) task

- [x] Provide the way to store the player session information in a persistent database (PostgreSQL). Also store all the games played by each player along with chat logs and provide the way for the player to see these logs and “replay” past games turn by turn.
