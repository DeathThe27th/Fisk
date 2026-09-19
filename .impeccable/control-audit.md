# Fisk control refinement

Source routes, hrefs and handlers were inspected alongside the rendered homepage baseline. Final rendered route inventory is in `control-audit-after.json`. A shared URL alone was not grounds for removal.

| Surface / label | Actual destination or action / context | Decision |
|---|---|---|
| Navbar: Research, Market Pulse, Methodology | #research, #news, /methodology | Keep distinct navigation |
| Navbar and closing: Open Fisk | /desk, blank session | Keep top entry and useful long-page closing entry |
| Hero: Ask Fisk | Reveals and focuses question field; submitted q enters /desk | Keep meaningful input action |
| Hero: Explore an example | /desk?q=NVDA example | Remove repeated scenario entry |
| Hero: A clearer view, below | #research | Keep local scroll cue |
| Navbar: hamburger | Toggles expanded navigation | Mobile only; desktop links already visible; remove duplicate desk item |
| Sign in / Sign out | Privy authentication | Keep essential authentication; account header hides duplicate logged-out prompt |
| Source strip: provider links, pause/play | Original provider sites; animation state | Keep source and accessibility controls; repeated moving copies excluded from keyboard navigation |
| Introduction: Open the desk | /desk, no context | Remove generic repeat |
| Introduction: How Fisk works | /methodology | Keep one explanatory action |
| Mint card: Explore the news | #news | Remove unnecessary explanatory-card action |
| Olive card: Explore connected research | /desk, no context | Remove generic repeat |
| Capabilities: Explore the desk | /desk, no context | Remove generic repeat |
| Capability photo: Explore a research question | /desk?q=NVDA example | Remove duplicate scenario affordance |
| Horizon: Research with perspective | /methodology | Remove repeated methodology action |
| Horizon slider / Research this view | Changes preview; /desk?q includes selected time horizon and focus | Keep contextual action |
| FAQ questions / Read our methodology | Expand answer; /methodology | Keep expansion; remove repeated link |
| Story: previous / next / Explore this scenario | Changes scenario; /desk?q carries selected question | Keep distinct context and controls |
| News: All news | /desk, no article or filter context | Remove misleading navigation |
| News: categories / Read headline | Filters existing feed / opens actual story evidence drawer | Keep |
| News: Ask Fisk / Ask Fisk about this story | /desk?q includes actual headline and original source URL | Keep article research distinct from reading source |
| News drawer: Close story / Open original source | Closes drawer / actual publisher URL | Keep essential source access |
| Empty news: Explore the desk | /desk, no context | Remove generic repeat |
| Footer: Research desk | /desk, adjacent to closing CTA | Remove repeated blank-desk entry |
| Footer: Market Pulse / Methodology / Back to top / brand | #news / /methodology / #top / home | Keep distinct navigation |
| Desk: top navigation, asset cards, Full market view | Existing account routes and /stock/TICKER | Keep product navigation |
| Desk: source links, chart intervals, citations | Original reporting / chart time range / evidence drawer | Keep factual controls |
| Desk: suggested questions, composer send, mobile collapse | Research with explicit question / submitted question / visibility state | Keep real actions |
| Composer: Deep research / Quick scan | Only toggled local label; API did not consume it | Remove unwired choice |
| Composer: Attach evidence / remove attachment | Local file queue, disclosed as not submitted to provider | Preserve existing honest limitation |
| Stock and login: Back to market pulse | Previously /; corrected to /#news | Keep and correct destination |
| Stock: Ask Fisk | /desk?q=Research TICKER | Keep asset context |
| Login: Account connected | Disabled button without behavior | Replace with status text; keep authentication and signed-in desk entry |
| Saved session: Back to desk / Open research desk | Both /desk, no context | Keep header back link only |
| Account pages: tabs, save, selects | Distinct routes / authenticated API mutation / form values | Keep |
| Watchlist saved row arrow | Previously inert decoration | Make valid ticker arrow link to actual /stock/TICKER |
| Journal saved row arrow | Inert decoration | Remove |

Existing constraints: file attachments remain a local queue; saved-session route remains an access-verification placeholder. Neither received invented functionality or a new destination.
