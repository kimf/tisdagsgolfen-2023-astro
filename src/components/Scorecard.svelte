<script>
  const holes = [
    { hole: 1, memberTees: 365, mastersTees: 400, par: 4, handicap: 7 },
    { hole: 2, memberTees: 505, mastersTees: 555, par: 5, handicap: 5 },
    { hole: 3, memberTees: 360, mastersTees: 360, par: 4, handicap: 13 },
    { hole: 4, memberTees: 170, mastersTees: 205, par: 3, handicap: 15 },
    { hole: 5, memberTees: 405, mastersTees: 435, par: 4, handicap: 1 },
    { hole: 6, memberTees: 165, mastersTees: 180, par: 3, handicap: 17 },
    { hole: 7, memberTees: 320, mastersTees: 360, par: 4, handicap: 11 },
    { hole: 8, memberTees: 460, mastersTees: 535, par: 5, handicap: 3 },
    { hole: 9, memberTees: 380, mastersTees: 435, par: 4, handicap: 9 },
    { hole: 10, memberTees: 450, mastersTees: 485, par: 4, handicap: 2 },
    { hole: 11, memberTees: 380, mastersTees: 455, par: 4, handicap: 14 },
    { hole: 12, memberTees: 155, mastersTees: 155, par: 3, handicap: 16 },
    { hole: 13, memberTees: 435, mastersTees: 465, par: 5, handicap: 6 },
    { hole: 14, memberTees: 380, mastersTees: 405, par: 4, handicap: 10 },
    { hole: 15, memberTees: 450, mastersTees: 500, par: 5, handicap: 8 },
    { hole: 16, memberTees: 145, mastersTees: 170, par: 3, handicap: 18 },
    { hole: 17, memberTees: 350, mastersTees: 400, par: 4, handicap: 12 },
    { hole: 18, memberTees: 375, mastersTees: 405, par: 4, handicap: 4 }
  ];

  const frontNine = holes.slice(0, 9);
  const backNine = holes.slice(9);

  const totalOut = frontNine.reduce(
    (acc, hole) => ({
      memberTees: acc.memberTees + hole.memberTees,
      mastersTees: acc.mastersTees + hole.mastersTees,
      par: acc.par + hole.par
    }),
    { memberTees: 0, mastersTees: 0, par: 0 }
  );

  const totalIn = backNine.reduce(
    (acc, hole) => ({
      memberTees: acc.memberTees + hole.memberTees,
      mastersTees: acc.mastersTees + hole.mastersTees,
      par: acc.par + hole.par
    }),
    { memberTees: 0, mastersTees: 0, par: 0 }
  );

  const total = {
    memberTees: totalOut.memberTees + totalIn.memberTees,
    mastersTees: totalOut.mastersTees + totalIn.mastersTees,
    par: totalOut.par + totalIn.par
  };
</script>

<div class="scorecard-container">
  <div class="scorecard">
    <table>
      <thead>
        <tr>
          <th colspan="5">HANDICAP</th>
          <th colspan="5">HANDICAP</th>
        </tr>
        <tr>
          <th>Hole</th>
          <th>Member Tees</th>
          <th>Masters Tees</th>
          <th>Par</th>
          <th>Handicap Rating</th>
          <th>Hole</th>
          <th>Member Tees</th>
          <th>Masters Tees</th>
          <th>Par</th>
          <th>Handicap Rating</th>
        </tr>
      </thead>
      <tbody>
        {#each frontNine as hole, index}
          <tr>
            <td>{hole.hole}</td>
            <td>{hole.memberTees}</td>
            <td>{hole.mastersTees}</td>
            <td>{hole.par}</td>
            <td>{hole.handicap}</td>
            <td>{backNine[index].hole}</td>
            <td>{backNine[index].memberTees}</td>
            <td>{backNine[index].mastersTees}</td>
            <td>{backNine[index].par}</td>
            <td>{backNine[index].handicap}</td>
          </tr>
        {/each}
        <tr class="total-row">
          <td>Out</td>
          <td>{totalOut.memberTees}</td>
          <td>{totalOut.mastersTees}</td>
          <td>{totalOut.par}</td>
          <td></td>
          <td>In</td>
          <td>{totalIn.memberTees}</td>
          <td>{totalIn.mastersTees}</td>
          <td>{totalIn.par}</td>
          <td></td>
        </tr>
        <tr class="total-row">
          <td>Scorer</td>
          <td colspan="4"></td>
          <td>To'l.</td>
          <td>{total.memberTees}</td>
          <td>{total.mastersTees}</td>
          <td>{total.par}</td>
          <td></td>
        </tr>
      </tbody>
    </table>
    <div class="footer">
      <div class="attest">
        <span>Attest</span>
        <span>Date</span>
      </div>
      <div class="net-scores">Net Scores</div>
    </div>
    <p class="note">
      Distances as shown represent yardage from ball washers to the mid point of the green.
    </p>
  </div>
</div>

<style>
  .scorecard-container {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    background-color: #f0f0f0;
    font-family: Arial, Helvetica, sans-serif;
  }

  .scorecard {
    background-color: #e6f3ff;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    max-width: 800px;
    width: 100%;
    border-collapse: collapse;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    color: #006400;
    font-size: 12px;
  }

  th,
  td {
    border: 1px solid #006400;
    padding: 4px;
    text-align: center;
  }

  th {
    background-color: #e6f3ff;
    font-weight: bold;
  }

  .total-row {
    font-weight: bold;
  }

  .footer {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    font-size: 12px;
  }

  .attest {
    display: flex;
    justify-content: space-between;
    width: 50%;
  }

  .net-scores {
    width: 50%;
    text-align: right;
  }

  .note {
    font-size: 10px;
    margin-top: 10px;
    text-align: center;
  }

  /* Vintage paper effect */
  .scorecard::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: radial-gradient(#d3c7a7 1px, transparent 1px),
      radial-gradient(#d3c7a7 1px, transparent 1px);
    background-size: 10px 10px;
    background-position:
      0 0,
      10px 10px;
    opacity: 0.2;
    pointer-events: none;
  }

  @media (max-width: 600px) {
    .scorecard {
      padding: 10px;
    }

    table {
      font-size: 10px;
    }

    th,
    td {
      padding: 2px;
    }

    .footer,
    .note {
      font-size: 8px;
    }
  }
</style>
