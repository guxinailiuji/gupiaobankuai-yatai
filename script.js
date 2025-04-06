document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    preventZooming();
    setupAnimations();
    setupRefreshButton();
}

function preventZooming() {
    window.addEventListener("wheel", (e) => {
        const isPinching = e.ctrlKey;
        if (isPinching) e.preventDefault();
    }, { passive: false });
}

function setupAnimations() {
    // Stagger the animations for section entries
    const sections = document.querySelectorAll('.market-section');
    sections.forEach((section, index) => {
        section.style.animationDelay = `${index * 0.1}s`;
    });

    // Add hover effects to cards
    const cards = document.querySelectorAll('.index-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.classList.add('shadow-md');
        });
        
        card.addEventListener('mouseleave', () => {
            card.classList.remove('shadow-md');
        });
    });
}

function setupRefreshButton() {
    const refreshBtn = document.querySelector('.refresh-btn');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', function() {
            // Add rotation animation
            const icon = this.querySelector('i');
            icon.classList.add('animate-spin');
            
            // Simulate a refresh after 1 second
            setTimeout(() => {
                // Update random stats
                updateRandomStats();
                icon.classList.remove('animate-spin');
                
                // Show a toast notification
                showToast('数据已成功刷新');
            }, 1000);
        });
    }
}

function updateRandomStats() {
    // Update random percentage changes for indices
    const percentageElements = document.querySelectorAll('[class*="text-green-600"], [class*="text-red-600"]');
    
    percentageElements.forEach(el => {
        // Generate random change between -2% and +5%
        const change = (Math.random() * 7 - 2).toFixed(1);
        const isPositive = change >= 0;
        
        // Update text and color
        el.innerHTML = `<i class="icon-trending-${isPositive ? 'up' : 'down'} mr-1"></i>${isPositive ? '+' : ''}${change}%`;
        el.className = el.className.replace(/text-[a-z]+-600/g, isPositive ? 'text-green-600' : 'text-red-600');
    });
}

function showToast(message) {
    // Create toast element
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-4 right-4 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg opacity-0 transition-opacity duration-300';
    toast.textContent = message;
    
    // Add to DOM
    document.body.appendChild(toast);
    
    // Trigger animation
    setTimeout(() => {
        toast.classList.add('opacity-100');
    }, 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
        toast.classList.remove('opacity-100');
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

// View selector functionality
const viewSelector = document.getElementById('view-selector');
if (viewSelector) {
    viewSelector.addEventListener('change', function() {
        // In a real app, this would change the data view
        showToast(`视图已更改为: ${this.value}`);
    });
}
