/**
 * Lock service state — the wizard.
 *
 * Step 1  Name the resource and pick a category.
 * Step 2  Paste the link — it is verified server-side against that category
 *         and a full report is shown before the wizard advances.
 * Step 3  Choose the unlock mode, token and price, and set the payout wallet.
 *
 * The verification in step 2 is the gate: a Blocked verdict never reaches
 * step 3, and the server refuses to store a blocked link regardless.
 *
 * These fields used to live in the shared store as `state.title`,
 * `state.summary`, `state.wizardStep` and so on. They belong to the wizard
 * alone now; nothing else reads them.
 */
export const lockState = {
  wizardStep: 1,
  categoryModalOpen: false,
  title: "",
  categoryId: "",
  url: "",
  summary: "",
  report: null,
  verifying: false,
  unlockMode: "paid_pure",
  tokenAddress: "0x0000000000000000000000000000000000000000",
  tokenSymbol: "POL",
  tokenDecimals: 18,
  price: "5",
  sellerWallet: "",
  creating: false,
  lastCreated: null,
};
