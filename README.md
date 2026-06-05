# Workshop Repair Manual Website

A comprehensive, interactive web-based repair manual extracted from factory workshop manuals for the **Volkswagen Golf MK2 (1984-1992)** and **Honda HR-V (1999-2006)**.

## Website Structure

```
/index.html                     # Homepage - vehicle selector
/vw-golf-mk2/                   # VW Golf MK2 hub
    index.html                  # Overview, specs, capacities
    systems/
        engine.html             # Engine mechanical - all variants
        fuel.html               # Fuel system - carb/EFI
        ignition.html           # Ignition systems
        cooling.html            # Cooling & HVAC
        transmission.html       # Gearbox, clutch, driveshafts
        brakes.html             # Braking system
        suspension.html         # Suspension & steering
        electrical.html         # Electrical with relay upgrades
        body.html               # Bodywork & interior
    wiring/
        index.html              # Wiring diagrams hub
/honda-hrv/                     # Honda HR-V hub
    index.html                  # Overview, specs, capacities
    systems/
        engine.html             # D16W1/D16W5 VTEC engines
        fuel.html               # PGM-FI system
        ignition.html           # Engine electrical
        cooling.html            # Cooling system
        transmission.html       # Manual & CVT
        brakes.html             # Braking with ABS
        suspension.html         # Suspension & steering
        electrical.html         # Body electrical & SRS
    wiring/
        index.html              # Wiring diagrams hub
/assets/
    css/style.css               # All styles (light/dark/print)
    js/main.js                  # Theme toggle, search, tabs, wiring
```

## Features

- **Dark mode toggle** - Essential for workshop use in low-light conditions
- **Year-range tabs** - Content split by production breakpoints (e.g., pre/post August 1985 for VW)
- **Interactive wiring diagrams** - Hover tooltips, wire colour coding, click-to-trace circuits
- **Relay upgrade recommendations** - VW Golf MK2 high-current circuit protection
- **Search functionality** - Search components across all pages
- **Print-friendly CSS** - Optimised for printing system pages
- **Responsive design** - Works on desktop, tablet, and mobile
- **No external dependencies** - Pure HTML/CSS/JS, works offline

## Data Sources

- **VW Golf MK2**: Haynes Service and Repair Manual 1081 (I.M. Coomber & Christopher Rogers, 1997)
- **Honda HR-V**: Honda Factory Shop Manual P/N 62S2H00 (1999-2006)
- Supplemental data from Bosch, Honda, Champion, and Delphi technical publications where noted

## Relay Upgrades (VW Golf MK2)

The following relay additions are recommended for all VW Golf MK2 vehicles:

| Circuit | Issue | Relay Rating | Wire Gauge |
|---------|-------|-------------|------------|
| Main beam headlights | Switch contact melting | 30A Bosch 0 332 019 150 | 2.5 mm2 |
| Heated rear window | Switch overheating | 30A | 4.0 mm2 |
| Heater blower (max speed) | Resistor bypass current | 20A | 4.0 mm2 |

## Vehicle Coverage

### VW Golf MK2 (1984-1992)
- Engines: 1.05L, 1.3L, 1.6L, 1.8L 8V, 1.8L 16V (GTi)
- Fuel systems: Pierburg/Solex carb, K-Jetronic, Digijet, Digifant, Mono-Jetronic
- Transmissions: 4/5-speed manual (020/084/085), 3-speed automatic
- Includes: Jetta, Van (mechanical features). Excludes: Convertible, Rallye, Caddy, Diesel, 4WD, post-Feb 1992

### Honda HR-V (1999-2006)
- Engines: D16W1 (105 PS), D16W5 VTEC (124 PS)
- Transmissions: 5-speed manual, CVT Multi Matic
- Systems: PGM-FI, VTEC, ABS, SRS, Immobiliser, Real Time 4WD

## Disclaimer

This manual is compiled from factory workshop data for reference purposes. Always consult a qualified mechanic for critical repairs. The authors accept no liability for errors or omissions. Vehicle manufacturers make alterations during production runs - verify all specifications against your specific vehicle.
