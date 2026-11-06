/* Ali: Raindance redeem page. Delivery details only show for physical rewards.
   ?reward=paperback (from the reward emails) picks the reward. The sheet's script checks the balance. */
(function () {
  const CLOSES = Date.parse("2027-02-15T00:00:00+01:00"); // redemptions close at the end of 14 February 2027
  const PHYSICAL = { paperback: 1, hardcover: 1, bundle: 1 };

  const select = document.getElementById("r-reward");
  const delivery = document.getElementById("r-delivery");
  const tee = document.getElementById("r-tee");
  const size = document.getElementById("r-size");

  if (Date.now() >= CLOSES) {
    document.getElementById("r-card").hidden = true;
    document.getElementById("r-closed").hidden = false;
    return;
  }

  // Early access retires at launch.
  if (window.RD && RD.after) {
    const early = select.querySelector('option[value="early"]');
    if (early) early.remove();
  }

  function update() {
    const physical = !!PHYSICAL[select.value];
    delivery.hidden = !physical;
    delivery.querySelectorAll("[data-delivery]").forEach(function (el) { el.required = physical; });
    const bundle = select.value === "bundle";
    tee.hidden = !bundle;
    size.required = bundle;
  }

  const wanted = new URLSearchParams(location.search).get("reward");
  if (wanted && select.querySelector('option[value="' + wanted.replace(/[^a-z]/g, "") + '"]')) select.value = wanted;
  select.addEventListener("change", update);
  update();
})();
