/* Eventos e animações em JavaScript nativo (sem bibliotecas externas). */
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const ease = { in: "cubic-bezier(.2,.8,.2,1)" };
const animate = (element, keyframes, options = {}) =>
    element?.animate(keyframes, {
        duration: 220,
        easing: ease.in,
        fill: "both",
        ...options,
    });

// Entrada de cada página e cartões, via Web Animations API nativa.
window.addEventListener("DOMContentLoaded", () => {
    animate(
        $(".page"),
        [
            { opacity: 0, transform: "translateY(10px)" },
            { opacity: 1, transform: "translateY(0)" },
        ],
        { duration: 300 }
    );
    $$(".library-card,.stats article,.settings-card,.viewer-card").forEach(
        (card, index) =>
            animate(
                card,
                [
                    { opacity: 0, transform: "translateY(8px)" },
                    { opacity: 1, transform: "translateY(0)" },
                ],
                { duration: 250, delay: Math.min(index * 35, 260) }
            )
    );
});

const sidebar = $("#sidebar"),
    overlay = $("#overlay");
function closeMenu() {
    if (sidebar?.classList.contains("open"))
        animate(
            sidebar,
            [
                { transform: "translateX(0)" },
                { transform: "translateX(-100%)" },
            ],
            { duration: 180 }
        );
    if (overlay) {
        animate(overlay, [{ opacity: 1 }, { opacity: 0 }], { duration: 160 });
        setTimeout(() => (overlay.style.display = "none"), 160);
    }
    setTimeout(() => sidebar?.classList.remove("open"), 180);
}
$("#menuBtn")?.addEventListener("click", () => {
    sidebar?.classList.add("open");
    if (overlay) {
        overlay.style.display = "block";
        animate(overlay, [{ opacity: 0 }, { opacity: 1 }], { duration: 180 });
    }
    animate(
        sidebar,
        [{ transform: "translateX(-100%)" }, { transform: "translateX(0)" }],
        { duration: 220 }
    );
});
$("#sidebarClose")?.addEventListener("click", closeMenu);
overlay?.addEventListener("click", closeMenu);

try {
    if (localStorage.getItem("jsonlibrary-theme") === "dark")
        document.body.classList.add("dark");
} catch (error) {}
$("#themeToggle")?.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark");
    try {
        localStorage.setItem("jsonlibrary-theme", isDark ? "dark" : "light");
    } catch (error) {}
    animate(document.body, [{ opacity: 0.84 }, { opacity: 1 }], {
        duration: 190,
    });
});

const modalLayer = $("#modalLayer");
function closeModal() {
    const active = $(".modal.active");
    if (!active || !modalLayer) return;
    animate(
        active,
        [
            { transform: "translateY(0)", opacity: 1 },
            { transform: "translateY(10px)", opacity: 0 },
        ],
        { duration: 160 }
    );
    setTimeout(() => {
        active.classList.remove("active");
        active.hidden = true;
        active.style.display = "none";
        modalLayer.hidden = true;
        modalLayer.style.display = "none";
        modalLayer.setAttribute("aria-hidden", "true");
    }, 160);
}
function openModal(kind, data = {}) {
    const modal = $(`.modal[data-modal-id="${kind}"]`);
    if (!modal || !modalLayer) return;
    // Segurança: fecha visualmente qualquer modal aberto antes de exibir o novo.
    $$(".modal").forEach((item) => {
        item.classList.remove("active");
        item.hidden = true;
    });
    // Apenas os modais de usuário em Permissões são preenchidos pelos data-* da linha selecionada.
    if (kind === "edit-user" || kind === "delete-user") {
        $$("[data-field]", modal).forEach((field) => {
            const key = field.dataset.field;
            if (Object.prototype.hasOwnProperty.call(data, key)) {
                const value = data[key];
                const available = [...(field.options || [])].some(
                    (option) => option.value === value
                );
                field.value =
                    field.tagName === "SELECT" && !available
                        ? field.options[0]?.value || ""
                        : value;
            }
        });
        $$("[data-text]", modal).forEach((field) => {
            const key = field.dataset.text;
            field.textContent = data[key] || field.textContent;
        });
        // Prepara a action REST do formulário de exclusão com o data-id do usuário selecionado.
        if (kind === "delete-user") {
            const form = $('[data-delete-form="user"]', modal);
            const template = form?.dataset.actionTemplate;
            if (form && template && data.id)
                form.action = template.replace("{id}", data.id);
        }
    }
    modalLayer.hidden = false;
    modalLayer.style.display = "flex";
    modalLayer.setAttribute("aria-hidden", "false");
    modal.hidden = false;
    modal.style.display = "block";
    modal.classList.add("active");
    const firstField = $("[data-field]", modal);
    setTimeout(() => firstField?.focus(), 0);
    animate(
        modal,
        [
            { opacity: 0, transform: "translateY(12px) scale(.98)" },
            { opacity: 1, transform: "translateY(0) scale(1)" },
        ],
        { duration: 210 }
    );
}

function orderCards(cards, mode) {
    return [...cards].sort((a, b) => {
        if (mode === "name")
            return a
                .querySelector("h3")
                .textContent.localeCompare(
                    b.querySelector("h3").textContent,
                    "pt-BR"
                );
        if (mode === "items")
            return (
                Number(
                    (
                        b.querySelector(".library-footer span")?.textContent ||
                        "0"
                    ).match(/\d+/)?.[0]
                ) -
                Number(
                    (
                        a.querySelector(".library-footer span")?.textContent ||
                        "0"
                    ).match(/\d+/)?.[0]
                )
            );
        return Number(b.dataset.updated || 0) - Number(a.dataset.updated || 0);
    });
}
function applyLibraryFilters(root = document) {
    const query = $("#librarySearch", root)?.value.toLowerCase().trim() || "";
    const type = $("#libraryTypeFilter", root)?.value || "Todos";
    const cards = $$(".library-card", root),
        matches = [],
        nonMatches = [];
    cards.forEach((card) => {
        const match =
            (card.dataset.search || card.textContent)
                .toLowerCase()
                .includes(query) &&
            (type === "Todos" || card.dataset.type === type);
        card.hidden = !match;
        (match ? matches : nonMatches).push(card);
    });
    // Resultados válidos são reposicionados no início da grade antes dos cards ocultos.
    const ordered = orderCards(
        matches,
        $("#librarySort", root)?.value || "recent"
    );
    const parent = cards[0]?.parentElement;
    if (parent)
        [...ordered, ...nonMatches].forEach((card) => parent.append(card));
    animate(parent, [{ opacity: 0.65 }, { opacity: 1 }], { duration: 180 });
    const empty = $("#libraryEmpty", root);
    if (empty) empty.hidden = matches.length !== 0;
}
const navbarSearch = $("#globalSearch"),
    navbarResults = $("#navbarSearchResults");
function renderNavbarResults(query) {
    if (!navbarResults) return;
    const term = query.toLowerCase().trim();
    if (!term) {
        navbarResults.hidden = true;
        navbarResults.innerHTML = "";
        return;
    }
    const results = $$(".library-card")
        .filter((card) =>
            (
                (card.dataset.libraryName || "") +
                " " +
                (card.dataset.search || "")
            )
                .toLowerCase()
                .includes(term)
        )
        .slice(0, 5);
    navbarResults.innerHTML = results.length
        ? results
              .map(
                  (card) =>
                      `<li><a href="${card.getAttribute("href")}">${card.dataset.libraryName}<small>${card.dataset.type || ""}</small></a></li>`
              )
              .join("")
        : '<li><a href="libraries.html">Nenhuma biblioteca encontrada</a></li>';
    navbarResults.hidden = false;
}
navbarSearch?.addEventListener("input", (event) => {
    const query = event.target.value;
    const catalogSearch = $("#librarySearch");
    if (catalogSearch) {
        catalogSearch.value = query;
        applyLibraryFilters();
    }
    renderNavbarResults(query);
});
navbarSearch?.addEventListener("focus", (event) =>
    renderNavbarResults(event.target.value)
);
document.addEventListener("click", (event) => {
    if (!event.target.closest(".context-search") && navbarResults)
        navbarResults.hidden = true;
});

$("#librarySearch")?.addEventListener("input", () => applyLibraryFilters());
$("#libraryTypeFilter")?.addEventListener("change", (event) => {
    const selected = event.target.value;
    $$("#libraryCategoryChips [data-category]").forEach((chip) =>
        chip.classList.toggle("active", chip.dataset.category === selected)
    );
    applyLibraryFilters();
});
$("#librarySort")?.addEventListener("change", () => applyLibraryFilters());
$("#clearLibraryFilters")?.addEventListener("click", () => {
    $("#librarySearch").value = "";
    $("#libraryTypeFilter").value = "Todos";
    $("#librarySort").value = "recent";
    $$("#libraryCategoryChips [data-category]").forEach((chip) =>
        chip.classList.toggle("active", chip.dataset.category === "Todos")
    );
    applyLibraryFilters();
});

// Chips de categoria no catálogo: usam data-category e filtram os data-type dos cards.
$$("#libraryCategoryChips [data-category]").forEach((button) =>
    button.addEventListener("click", () => {
        $$("#libraryCategoryChips [data-category]").forEach((item) =>
            item.classList.remove("active")
        );
        button.classList.add("active");
        const typeFilter = $("#libraryTypeFilter");
        if (typeFilter) typeFilter.value = button.dataset.category;
        applyLibraryFilters();
    })
);

function filterUsers() {
    const query = $("#userSearch")?.value.toLowerCase().trim() || "",
        status = $("#userStatusFilter")?.value || "Todos",
        role = $("#userRoleFilter")?.value || "Todos";
    $$("#permissions .user-table tbody tr").forEach((row) => {
        const rowStatus = $(".status", row)?.textContent.trim() || "",
            rowRole = $(".role", row)?.textContent.trim() || "",
            person = $(".person", row)?.textContent.toLowerCase() || "";
        const visible =
            person.includes(query) &&
            (status === "Todos" || rowStatus === status) &&
            (role === "Todos" || rowRole === role);
        row.hidden = !visible;
        if (visible)
            animate(
                row,
                [
                    { opacity: 0, transform: "translateX(-5px)" },
                    { opacity: 1, transform: "translateX(0)" },
                ],
                { duration: 160 }
            );
    });
}
$("#userSearch")?.addEventListener("input", filterUsers);
$("#userStatusFilter")?.addEventListener("change", filterUsers);
$("#userRoleFilter")?.addEventListener("change", filterUsers);
$("#clearUserFilters")?.addEventListener("click", () => {
    const search = $("#userSearch"),
        status = $("#userStatusFilter"),
        role = $("#userRoleFilter");
    if (search) search.value = "";
    if (status) status.value = "Todos";
    if (role) role.value = "Todos";
    filterUsers();
    animate(
        $("#permissions .table-card"),
        [{ opacity: 0.72 }, { opacity: 1 }],
        { duration: 180 }
    );
});
$$(".itemSearch").forEach((input) =>
    input.addEventListener("input", () =>
        $$(".item-list article").forEach(
            (item) =>
                (item.hidden = !item.textContent
                    .toLowerCase()
                    .includes(input.value.toLowerCase()))
        )
    )
);

document.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-modal]");
    if (trigger) {
        openModal(trigger.dataset.modal, trigger.dataset);
        return;
    }
    if (event.target.closest(".modal-close") || event.target === modalLayer) {
        closeModal();
        return;
    }
});
$$(".modal-close").forEach((button) =>
    button.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        closeModal();
    })
);
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && $(".modal.active")) closeModal();
});

// Gatilhos diretos: os modais visuais de todas as páginas abrem sem depender de preenchimento automático.
$$("[data-modal]").forEach((trigger) =>
    trigger.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        openModal(trigger.dataset.modal, trigger.dataset);
    })
);

// Página de validação: avanço entre dígitos e distribuição de código colado.
const codeInputs = $$(".verification-code input");
codeInputs.forEach((input, index) => {
    input.addEventListener("input", () => {
        input.value = input.value.replace(/\D/g, "").slice(0, 1);
        if (input.value && codeInputs[index + 1]) codeInputs[index + 1].focus();
    });
    input.addEventListener("keydown", (event) => {
        if (event.key === "Backspace" && !input.value && codeInputs[index - 1])
            codeInputs[index - 1].focus();
    });
    input.addEventListener("paste", (event) => {
        const digits = (event.clipboardData?.getData("text") || "")
            .replace(/\D/g, "")
            .slice(0, 6);
        if (!digits) return;
        event.preventDefault();
        digits.split("").forEach((digit, position) => {
            if (codeInputs[position]) codeInputs[position].value = digit;
        });
        codeInputs[Math.min(digits.length, 6) - 1]?.focus();
    });
});

// Mostrar ou ocultar senha nos formulários de autenticação.
$$(".toggle-password").forEach((button) =>
    button.addEventListener("click", () => {
        const input = $("input", button.closest(".password-field"));
        if (!input) return;
        const visible = input.type === "text";
        input.type = visible ? "password" : "text";
        button.setAttribute("aria-pressed", String(!visible));
        button.setAttribute(
            "aria-label",
            visible ? "Mostrar senha" : "Ocultar senha"
        );
    })
);
