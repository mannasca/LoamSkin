import styles from './LabelMockup.module.css'

export default function LabelMockup() {
  return (
    <div className={styles.wrap}>
      <p className={styles.kicker}>Label mockup · body butter</p>
      <p className={styles.kickerSub}>brand name &amp; details are placeholders — swap in your final ones</p>

      <div className={styles.panels}>
        {/* FRONT */}
        <div className={styles.panelShell}>
          <p className={styles.tag}>Front · main display panel</p>
          <div className={`${styles.label} ${styles.front}`}>
            <div className={styles.brand}>Mitti</div>
            <div className={styles.brandRule}></div>
            <div className={styles.scent}>First Rain</div>
            <div className={styles.scentNative}>pehli baarish</div>
            <div className={styles.horizon}>
              <span className={styles.line}></span>
              <span className={styles.drop}></span>
            </div>
            <div className={styles.typeLine}>Body Butter</div>
            <div className={styles.typeFr}>Beurre corporel</div>
            <div className={styles.netwt}>Net wt 50 g · 1.7 oz</div>
          </div>
        </div>

        {/* BACK */}
        <div className={styles.panelShell}>
          <p className={styles.tag}>Back · everything else</p>
          <div className={`${styles.label} ${styles.back}`}>
            <div className={styles.backBrand}>Mitti</div>
            <div className={styles.backScent}>First Rain</div>
            <div className={styles.hr}></div>

            <div className={styles.blk}>
              <h4>How to use · Mode d'emploi</h4>
              <p>
                Warm a little between fingertips and massage into skin, ideally after a shower.
                <span className={styles.fr}>Réchauffer un peu entre les doigts et masser sur la peau, idéalement après la douche.</span>
              </p>
            </div>

            <div className={styles.blk}>
              <h4>Ingredients · Ingrédients</h4>
              <p className={styles.inci}>
                Butyrospermum Parkii (Shea) Butter, Prunus Amygdalus Dulcis (Sweet Almond) Oil,
                Simmondsia Chinensis (Jojoba) Seed Oil, Cera Alba (Beeswax), Tocopherol, Parfum (Fragrance).
              </p>
              <p className={styles.inci} style={{ marginTop: '4px' }}>
                <strong>Contains · Contient:</strong> Linalool, Citronellol.
              </p>
            </div>

            <div className={styles.claim}>
              Made with organic shea butter &amp; oils
              <span className={styles.claimFr}>Formulé avec beurre de karité et huiles biologiques</span>
            </div>

            <div className={styles.blk} style={{ marginTop: '11px' }}>
              <h4>Caution · Attention</h4>
              <p>
                For external use only. Keep out of reach of children. Stop use if irritation occurs.
                <span className={styles.fr}>Usage externe seulement. Garder hors de portée des enfants. Cesser en cas d'irritation.</span>
              </p>
            </div>

            <div className={styles.backFoot}>
              <div className={styles.rp}>
                Made in Canada for · Fabriqué au Canada pour<br />
                <strong>MITTI</strong> — a brand by Huzb<br />
                123 Example St, Toronto, ON&nbsp;M1M&nbsp;1M1<br />
                mitti.ca · Batch&nbsp;0001
              </div>
              <div className={styles.pao}>
                <div className={styles.jar}></div>
                12M
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className={styles.legend}>
        <h3>What goes where — and why</h3>
        <div className={styles.row}>
          <div className={styles.side}>Front</div>
          <div className={styles.txt}><b>Brand is the hero</b>, then the scent name (the emotional star), then the product type <b>in both languages</b>. Net weight sits small at the bottom — required on the front, but it stays discreet.</div>
        </div>
        <div className={styles.row}>
          <div className={styles.side}>Back</div>
          <div className={styles.txt}><b>Ingredients in INCI names</b> (descending order) — INCI is universal, but the heading is bilingual. The <b>"Contains" allergen line</b> covers the April 2026 fragrance-allergen rule.</div>
        </div>
        <div className={styles.row}>
          <div className={styles.side}>Back</div>
          <div className={styles.txt}><b>Responsible Person + Canadian address</b> is mandatory — that's you/Huzb in Toronto. Directions and cautions are bilingual; the open-jar "12M" symbol is the period-after-opening.</div>
        </div>
        <div className={styles.row}>
          <div className={styles.side}>Claim</div>
          <div className={styles.txt}><b>"Made with organic…"</b> is an honest, legal phrasing. Never write "Certified Organic" or "all natural" unless you hold the certification.</div>
        </div>
        <p className={styles.note}>Colourway shown: dry-earth paper on a wet-concrete surface (the petrichor idea). It also works as a dark "wet earth" label with cream type — say the word and I'll show that version.</p>
      </div>
    </div>
  )
}
