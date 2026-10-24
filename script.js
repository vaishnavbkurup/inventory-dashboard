
const inventory = [
  { name: "Laptop", price: 800 },
  { name: "Mouse", price: 25 },
  { name: "Keyboard", price: 45 }
];

// Get HTML elements using the DOM
const productForm = document.getElementById("productForm");
const productName = document.getElementById("productName");
const productPrice = document.getElementById("productPrice");
const inventoryBody = document.getElementById("inventoryBody");
const filter = document.getElementById("filter");

// Categorize products
function getCategory(price) {
  if (price < 50) return "Budget";
  if (price < 200) return "Standard";
  return "Premium";
}

// Calculate total inventory value
function calculateTotal(items) {
  let sum = 0;

  for (let i = 0; i < items.length; i++) {
    sum += items[i].price;
  }

  return sum;
}

// Display products and update analytics
function renderInventory() {
  const visibleItems =
    filter.value === "affordable"
      ? inventory.filter(item => item.price < 200)
      : inventory;

  // Clear old table rows before rendering
  inventoryBody.innerHTML = "";

  visibleItems.forEach(item => {
    const row = document.createElement("tr");
    const category = getCategory(item.price);

    row.innerHTML = `
      <td>${item.name}</td>
      <td>$${item.price.toFixed(2)}</td>
      <td>
        <span class="badge ${category.toLowerCase()}">
          ${category}
        </span>
      </td>
    `;

    inventoryBody.appendChild(row);
  });

  // Update summary cards using the complete inventory
  document.getElementById("totalProducts").textContent =
    inventory.length;

  document.getElementById("totalValue").textContent =
    "$" + calculateTotal(inventory).toFixed(2);

  document.getElementById("affordableCount").textContent =
    inventory.filter(item => item.price < 200).length;

  // Generate formatted report
  const formattedReportList = inventory.map(
    item => `${item.name.toUpperCase()}: $${item.price.toFixed(2)}`
  );

  document.getElementById("reportList").innerHTML =
    formattedReportList
      .map(item => `<li>${item}</li>`)
      .join("");
}

// Add a product when the form is submitted
productForm.addEventListener("submit", function(event) {
  event.preventDefault();

  const name = productName.value.trim();
  const price = Number(productPrice.value);

  if (!name || productPrice.value.trim() === "" ||
      !Number.isFinite(price) || price < 0) {
    alert("Please enter a valid product name and price.");
    return;
  }

  inventory.push({
    name: name,
    price: price
  });

  productForm.reset();

  renderInventory();
});

// Update the displayed table when the filter changes
filter.addEventListener("change", renderInventory);

// Display the initial inventory
renderInventory();
