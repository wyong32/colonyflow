export function Footer() {
  return (
    <footer className="border-t mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-semibold mb-3">Colony Flow Guide</h3>
            <p className="text-sm text-muted-foreground">
              Updated walkthroughs and strategy notes for Colony Flow levels.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/levels" className="text-muted-foreground hover:text-primary transition-colors">
                  Available Levels
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Community</h3>
            <p className="text-sm text-muted-foreground">
              Follow new guide updates, tips, and walkthrough additions.
            </p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          Copyright 2026 ColonyFlow.org. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
