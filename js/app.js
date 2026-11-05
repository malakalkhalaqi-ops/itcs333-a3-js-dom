
(function () {
    const todoForm = document.getElementById("todo-form");
    const todoInput = document.getElementById("todo-input");
    const todoList = document.getElementById("todo-list");
    const errorMsg = document.getElementById("error-msg");
    const counter = document.getElementById("counter");

    const filterAll = document.getElementById("filter-all");
    const filterActive = document.getElementById("filter-active");
    const filterDone = document.getElementById("filter-done");

    let currentFilter = "all";

    // Update the counter
    function updateCounter() {
        const items = todoList.querySelectorAll("li");
        let remaining = 0;

        items.forEach(function (item) {
            if (!item.classList.contains("completed")) {
                remaining++;
            }
        });

        counter.textContent =
            remaining + (remaining === 1 ? " item left" : " items left");
    }

    // Apply the selected filter
    function applyFilter() {
        const items = todoList.querySelectorAll("li");

        items.forEach(function (item) {
            const isCompleted = item.classList.contains("completed");

            if (currentFilter === "all") {
                item.style.display = "";
            } else if (currentFilter === "active") {
                item.style.display = isCompleted ? "none" : "";
            } else if (currentFilter === "done") {
                item.style.display = isCompleted ? "" : "none";
            }
        });
    }

    // Add a new task
    todoForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const taskText = todoInput.value.trim();

        if (taskText === "") {
            errorMsg.classList.remove("hidden");
            return;
        }

        errorMsg.classList.add("hidden");

        const li = document.createElement("li");

        const span = document.createElement("span");
        span.className = "item-text";
        span.textContent = taskText;

        const deleteBtn = document.createElement("button");
        deleteBtn.type = "button";
        deleteBtn.className = "delete-btn";
        deleteBtn.textContent = "Delete";

        li.appendChild(span);
        li.appendChild(deleteBtn);

        todoList.appendChild(li);

        todoInput.value = "";

        applyFilter();
        updateCounter();
    });

    // Event delegation for completing and deleting tasks
    todoList.addEventListener("click", function (event) {
        const deleteBtn = event.target.closest(".delete-btn");

        if (deleteBtn) {
            const li = deleteBtn.closest("li");
            li.remove();

            applyFilter();
            updateCounter();
            return;
        }

        const itemText = event.target.closest(".item-text");

        if (itemText && todoList.contains(itemText)) {
            const li = itemText.closest("li");
            li.classList.toggle("completed");

            applyFilter();
            updateCounter();
        }
    });

    // Show all tasks
    filterAll.addEventListener("click", function () {
        currentFilter = "all";
        applyFilter();
    });

    // Show active tasks
    filterActive.addEventListener("click", function () {
        currentFilter = "active";
        applyFilter();
    });

    // Show completed tasks
    filterDone.addEventListener("click", function () {
        currentFilter = "done";
        applyFilter();
    });

    updateCounter();
})();
