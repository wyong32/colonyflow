export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  categoryId: string;
  date: string;
  readTime: string;
  author: string;
  content: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: "colony-flow-beginner-guide",
    title: "Colony Flow Beginner Guide: How to Sort Cubes and Clear Early Levels",
    excerpt: "Learn the core Colony Flow rules, ant movement logic, cube sorting priorities, and beginner mistakes to avoid when solving early colony puzzles.",
    image: "/Colony-Flow-1.jpg",
    category: "Guides & Tips",
    categoryId: "guides",
    date: "July 7, 2026",
    readTime: "8 min read",
    author: "Colony Flow Guide Team",
    content: `
      <p>Colony Flow looks simple at first: tap a cube stack, send an ant, and match cubes to the correct color hole. The deeper challenge is order. Every ant move changes the available space, and one blocked color can stop the full colony route.</p>
      <h2>Understand the Goal Before You Tap</h2>
      <p>Each level asks you to clear colorful cubes from the board and reveal a pixel art picture. Before your first move, identify the color holes, visible stacks, and limited colony slots. A strong first move sends cubes to a color that can be cleared immediately.</p>
      <h2>How Ant Movement Works</h2>
      <p>Worker ants move from cube stacks and carry cubes along the trail. If the matching color hole is open, the ant can help reduce the board. If the destination is blocked or the wrong color enters a slot, your puzzle can become harder quickly.</p>
      <h2>Beginner Strategy</h2>
      <p>Start with small color groups, then open space for larger groups. Do not tap every available stack just because it can move. Watch where the carried cube will go and whether it creates room for the next two moves.</p>
      <h2>Common Mistakes</h2>
      <p>The most common beginner mistake is filling all colony slots with colors that cannot be delivered. Keep one slot open whenever possible. Another mistake is ignoring hidden cubes underneath a stack; always think about what color will appear after the current cube leaves.</p>
      <h2>When to Use Walkthrough Videos</h2>
      <p>A walkthrough is most useful when you understand the board but cannot find the order. Pause the video after each major move and copy the sequence. This teaches the route instead of only giving the answer.</p>
      <h2>Final Tip</h2>
      <p>Colony Flow is not about tapping fast. It is about clean sequencing, smart slot management, and noticing which colors must be freed first.</p>
    `,
  },
  {
    id: 2,
    slug: "colony-flow-tips-and-strategy",
    title: "Colony Flow Tips and Strategy: Better Move Order for Tricky Levels",
    excerpt: "Use these Colony Flow strategy tips to manage limited slots, avoid blocked trails, choose safer cube stacks, and solve harder ant colony puzzles.",
    image: "/Colony-Flow-33.jpg",
    category: "Guides & Tips",
    categoryId: "guides",
    date: "July 7, 2026",
    readTime: "9 min read",
    author: "Colony Flow Guide Team",
    content: `
      <p>Tricky Colony Flow levels usually fail for one reason: the move order fills the colony with the wrong colors. Once the sorting space is blocked, even a board that looked easy can become impossible to finish cleanly.</p>
      <h2>Prioritize Restricted Colors</h2>
      <p>If a color appears in only one stack or has only one visible hole, solve it early. Restricted colors become harder to free after other ants occupy the route.</p>
      <h2>Keep a Recovery Slot</h2>
      <p>Try to keep one colony slot open. This gives you a recovery path when the next cube in a stack is not the color you expected. A full slot row leaves no room for correction.</p>
      <h2>Read the Stack From Top to Bottom</h2>
      <p>Do not only look at the top cube. Ask what happens after the ant removes it. If the next cube creates a better match, the stack may be worth tapping. If it exposes a blocked color, wait.</p>
      <h2>Clear Short Groups First</h2>
      <p>Short groups are often safer because they open space quickly. Clearing a small color group can unlock a path for a longer group later in the level.</p>
      <h2>Use Pixel Art Progress as Feedback</h2>
      <p>The revealed pixel art is a reward, but it also confirms that the board is progressing in the right direction. If progress stops for several moves, review your color order.</p>
      <h2>Practice With Video Routes</h2>
      <p>When a level is difficult, watch the first half of the walkthrough, then try to finish the rest yourself. This builds better recognition for future Colony Flow puzzles.</p>
    `,
  },
  {
    id: 3,
    slug: "how-to-solve-colony-flow-levels-faster",
    title: "How to Solve Colony Flow Levels Faster Without Rushing",
    excerpt: "Improve Colony Flow completion time by planning better, recognizing color patterns, and reducing wasted ant moves without turning the game into a speed test.",
    image: "/Colony-Flow-68.jpg",
    category: "Walkthroughs",
    categoryId: "walkthroughs",
    date: "July 7, 2026",
    readTime: "7 min read",
    author: "Colony Flow Guide Team",
    content: `
      <p>Solving Colony Flow faster does not mean tapping quickly. The fastest clears usually come from fewer mistakes, fewer blocked slots, and better color order. A calm plan beats a rushed board.</p>
      <h2>Preview the Board</h2>
      <p>Spend a few seconds reading the board before the first move. Identify the easiest color to clear, the most dangerous stack, and any slot that could become blocked.</p>
      <h2>Reduce Wasted Moves</h2>
      <p>A wasted move sends an ant without improving the board. If a cube cannot reach a matching hole or does not free a useful color underneath, wait until the board changes.</p>
      <h2>Use a Two-Move Rule</h2>
      <p>Before tapping, know your current move and the next move. This simple rule prevents most slot traps because you are always thinking beyond the visible cube.</p>
      <h2>Group Similar Colors</h2>
      <p>When possible, clear one color group fully before starting another. Switching colors too often can fill colony slots with unfinished groups and slow down the puzzle.</p>
      <h2>Pause Walkthroughs Strategically</h2>
      <p>If you use a video guide, do not watch passively. Pause at key board states, copy the layout, then play your own level. This improves both speed and understanding.</p>
      <h2>Stay Relaxed</h2>
      <p>Colony Flow is designed as a relaxing puzzle. Treat speed as a result of better planning, not pressure. Cleaner routes naturally feel faster.</p>
    `,
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug);
}

export function getBlogPostsByCategory(categoryId: string): BlogPost[] {
  if (categoryId === 'all') return blogPosts;
  return blogPosts.filter(post => post.categoryId === categoryId);
}
