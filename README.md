# Ticketmaster Search Engine

This project is bootstrapped using the [T3 Stack](https://create.t3.gg/), and supports querying the [Ticketmaster API](https://developer.ticketmaster.com/api-explorer/) by:

- Event/Location
- Start/End Date
- Result Size

After you input your options, click on the <b>Search</b> button to see results!

<br />
<hr />
<br />

## Project Setup

<br />

### 1. Install Dependencies

If you have `pnpm` installed locally (if not [install pnpm](https://formulae.brew.sh/formula/node)), in the terminal run:

```terminal
$  pnpm install
```

If you have `npm` installed locally (if not follow [install npm](https://pnpm.io/installation)), in the terminal run:

```terminal
$  npm install
```

<br />

### 2. Populate Environment Variables

For security, the `.env` file and its contents were not published to this repository. To ensure the project functions as expected, follow the steps below:

1. Navigate to the [Ticketmaster API](https://developer.ticketmaster.com/api-explorer/)
2. Copy the <b>Discovery API v2 key</b>
3. At the project root, create a `.env` file
4. Set `TICKETMASTER_API_KEY={...paste key}`

<br />

### 3. Run Development Environment

To run this project locally, in the terminal run:

```terminal
$  npm run dev
```

The app will be hosted at [http://localhost:3000](http://localhost:3000) <i>(Note: The app will default to port 3000 and will handle if a process is running on the port)</i>

<br />

### 3a. View App in Production Environment

Vercel/Nextjs supports easy deployment of applications and can be found at https://ticketmaster-indol.vercel.app/
