<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>R.A. Crawford | Fantasy Author</title>
  <meta name="description" content="Official website of fantasy author R.A. Crawford, author of The War of Feather and Shadow, Book One of The Raven Cycle." />
  <meta property="og:title" content="R.A. Crawford | The War of Feather and Shadow" />
  <meta property="og:description" content="Enter the official online home of R.A. Crawford and The Raven Cycle." />
  <meta property="og:image" content="assets/cover.jpg" />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;700;900&family=Inter:wght@400;500;700&family=Lora:ital,wght@0,400;0,600;1,400&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="styles.css" />
</head>
<body>
  <div class="grain"></div>
  <header class="site-header">
    <a class="brand" href="index.html">R.A. Crawford</a>
    <button class="menu-toggle" aria-label="Open navigation">☰</button>
    <nav class="nav">
      <a href="index.html">Home</a>
      <a href="books.html">Books</a>
      <a href="world.html">World</a>
      <a href="about.html">About</a>
      <a href="brand.html">Brand</a>
      <a href="contact.html">Contact</a>
    </nav>
  </header>

  <main>
    <section class="hero hero-v7">
      <div class="moon" aria-hidden="true"></div>
      <div class="feathers" aria-hidden="true"><span></span><span></span><span></span><span></span></div>
      <div class="hero-copy reveal">
        <p class="eyebrow">Official Author Website</p>
        <h1>R.A. Crawford</h1>
        <p class="subtitle">Epic Fantasy Author</p>
        <h2><em>The War of Feather and Shadow</em></h2>
        <p class="tagline">A crown divides. A bloodline rises. A war begins.</p>
        <p class="hero-intro">Enter the world of <strong>The Raven Cycle</strong>, where ancient houses, forgotten powers, and ravens in the dark mark the beginning of a war that will change everything.</p>
        <div class="actions">
          <a class="btn primary" href="books.html">Explore the Book</a>
          <a class="btn ghost" href="world.html">Enter the World</a>
        </div>
      </div>
      <div class="hero-stack reveal delay">
        <img class="portrait-card" src="assets/author.jpg" alt="R.A. Crawford author portrait" />
        <img class="cover-card" src="assets/cover.jpg" alt="The War of Feather and Shadow book cover" />
      </div>
    </section>

    <section class="section intro-band reveal">
      <p class="eyebrow center">Book One of The Raven Cycle</p>
      <h2 class="center">The War Begins in Feather and Shadow</h2>
      <p class="lead center narrow">Ancient rivalries stir. Forgotten bloodlines return. As ravens gather over kingdoms already divided, unlikely heroes must decide whether destiny is something they inherit — or something they forge.</p>
    </section>

    <section class="book-feature section">
      <div class="book-cover reveal"><img src="assets/cover.jpg" alt="The War of Feather and Shadow book cover" /></div>
      <div class="book-copy reveal delay">
        <p class="eyebrow">Featured Novel</p>
        <h2>The War of Feather and Shadow</h2>
        <p>A dark epic fantasy built on bloodlines, betrayal, prophecy, and the price of power. This page will become the official hub for release dates, purchase links, reviews, excerpts, and reader extras.</p>
        <div class="actions"><a class="btn primary" href="books.html">Book Details</a><a class="btn ghost" href="about.html">Meet the Author</a></div>
      </div>
    </section>

    <section class="section cards-section">
      <p class="eyebrow center">The Raven Cycle</p>
      <h2 class="center">A World Waiting to Be Opened</h2>
      <div class="cards">
        <article class="card reveal"><h3>The Five Houses</h3><p>Power, legacy, loyalty, and betrayal shape the fate of kingdoms.</p></article>
        <article class="card reveal"><h3>The Ravens</h3><p>Omens, watchers, messengers — and something far older than superstition.</p></article>
        <article class="card reveal"><h3>Magic & Bloodlines</h3><p>Ancient gifts awaken when the world can least afford them.</p></article>
      </div>
    </section>

    <section class="newsletter section reveal">
      <h2>Join the Raven's Flock</h2>
      <p>Receive book news, behind-the-scenes notes, lore, and release updates from R.A. Crawford.</p>
      <form onsubmit="event.preventDefault(); alert('Newsletter integration coming soon.');">
        <input type="email" placeholder="Your email address" aria-label="Email address" />
        <button class="btn primary" type="submit">Join</button>
      </form>
    </section>
  </main>

  <footer class="footer"><p>© <span id="year"></span> R.A. Crawford. All rights reserved.</p></footer>
  <script src="main.js"></script>
</body>
</html>
