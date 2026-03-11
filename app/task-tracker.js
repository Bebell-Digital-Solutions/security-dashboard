
<!-- Task Tracker Script - Add this before the closing </body> tag -->

    // ==========================================
    // CHRONOLOGICAL TASK TRACKER
    // ==========================================
    const TASK_NOTIFICATION_INTERVAL = 30000; // Show notification every 30 seconds if task not completed
    const TASK_COMPLETION_POPUP_DELAY = 2000; // Show "Task Complete" message for 2 seconds

    // Define all tasks in chronological order (matching the order they appear in the dashboard)
    const CHRONOLOGICAL_TASKS = [
        // Overview Section Tasks (IDs from overview.html)
        { id: 'overview-action1', section: 'Overview', description: 'Read the "What this is" section' },
        { id: 'overview-action2', section: 'Overview', description: 'Understand the "Why it matters" explanation' },
        { id: 'overview-action3', section: 'Overview', description: 'Familiarize yourself with the navigation on the left' },
        
        // Email as Identity Section Tasks (from email-identity.html)
        { id: 'email-action1', section: 'Email as Identity', description: 'Review your primary email account security' },
        { id: 'email-action2', section: 'Email as Identity', description: 'Set up email recovery options' },
        { id: 'email-action3', section: 'Email as Identity', description: 'Remove unused email aliases' },
        { id: 'email-action4', section: 'Email as Identity', description: 'Enable email forwarding rules review' },
        
        // Password Strategy Section Tasks (from password-strategy.html)
        { id: 'password-action1', section: 'Password Strategy', description: 'Audit your current passwords for reuse' },
        { id: 'password-action2', section: 'Password Strategy', description: 'Install and set up a password manager' },
        { id: 'password-action3', section: 'Password Strategy', description: 'Generate strong unique passwords for all accounts' },
        { id: 'password-action4', section: 'Password Strategy', description: 'Change passwords for critical accounts' },
        
        // Two Factor Protection Section Tasks (from two-factor-protection.html)
        { id: '2fa-action1', section: 'Two Factor Protection', description: 'Identify which accounts support 2FA' },
        { id: '2fa-action2', section: 'Two Factor Protection', description: 'Install an authenticator app' },
        { id: '2fa-action3', section: 'Two Factor Protection', description: 'Enable 2FA on your email account' },
        { id: '2fa-action4', section: 'Two Factor Protection', description: 'Enable 2FA on your banking apps' },
        { id: '2fa-action5', section: 'Two Factor Protection', description: 'Save backup codes securely' },
        
        // Scam & Fraud Awareness Section Tasks (from scam-fraud-awareness.html)
        { id: 'scam-action1', section: 'Scam & Fraud', description: 'Learn to identify phishing emails' },
        { id: 'scam-action2', section: 'Scam & Fraud', description: 'Review recent suspicious messages' },
        { id: 'scam-action3', section: 'Scam & Fraud', description: 'Set up spam filters' },
        { id: 'scam-action4', section: 'Scam & Fraud', description: 'Report phishing attempts' },
        
        // Inbox Cleanup Section Tasks (from inbox-account-cleanup.html)
        { id: 'inbox-action1', section: 'Inbox Cleanup', description: 'Unsubscribe from unwanted newsletters' },
        { id: 'inbox-action2', section: 'Inbox Cleanup', description: 'Delete old unused accounts' },
        { id: 'inbox-action3', section: 'Inbox Cleanup', description: 'Organize emails into folders' },
        { id: 'inbox-action4', section: 'Inbox Cleanup', description: 'Set up email filters' },
        
        // Breach Detection Section Tasks (from breach-detection.html)
        { id: 'breach-action1', section: 'Breach Detection', description: 'Check if your email was in a data breach' },
        { id: 'breach-action2', section: 'Breach Detection', description: 'Check passwords against breach databases' },
        { id: 'breach-action3', section: 'Breach Detection', description: 'Set up breach monitoring service' },
        { id: 'breach-action4', section: 'Breach Detection', description: 'Secure accounts found in breaches' },
        
        // Tracking & Cookies Section Tasks (from tracking-cookies-ads.html)
        { id: 'tracking-action1', section: 'Tracking & Cookies', description: 'Clear browser cookies and cache' },
        { id: 'tracking-action2', section: 'Tracking & Cookies', description: 'Install privacy-focused browser extensions' },
        { id: 'tracking-action3', section: 'Tracking & Cookies', description: 'Adjust browser privacy settings' },
        { id: 'tracking-action4', section: 'Tracking & Cookies', description: 'Opt out of advertising tracking' },
        { id: 'tracking-action5', section: 'Tracking & Cookies', description: 'Review app permissions on devices' },
        
        // Reports & Resources Section Tasks (from reports-resources.html)
        { id: 'reports-action1', section: 'Reports & Resources', description: 'Download your security report' },
        { id: 'reports-action2', section: 'Reports & Resources', description: 'Review recommended resources' },
        { id: 'reports-action3', section: 'Reports & Resources', description: 'Bookmark useful security tools' },
        { id: 'reports-action4', section: 'Reports & Resources', description: 'Set a reminder for next security review' }
    ];

    // ==========================================
    // NOTIFICATION STYLES
    // ==========================================
    function addNotificationStyles() {
        if (document.getElementById('task-notification-styles')) return;
        
        const styles = document.createElement('style');
        styles.id = 'task-notification-styles';
        styles.textContent = `
            .task-notification {
                position: fixed;
                bottom: 20px;
                right: 20px;
                max-width: 350px;
                background: var(--bg-card);
                border-left: 4px solid var(--primary);
                border-radius: 12px;
                padding: 1rem;
                box-shadow: 0 10px 40px rgba(0,0,0,0.5), 0 0 30px rgba(255,80,17,0.3);
                z-index: 10001;
                transform: translateX(400px);
                transition: transform 0.3s ease;
                font-family: var(--font-code);
                border: 1px solid var(--border);
                backdrop-filter: blur(10px);
            }
            
            .task-notification.show {
                transform: translateX(0);
            }
            
            .task-notification-header {
                display: flex;
                align-items: center;
                gap: 10px;
                margin-bottom: 8px;
            }
            
            .task-notification-icon {
                width: 30px;
                height: 30px;
                background: var(--gradient-1);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: var(--bg-dark);
                font-weight: bold;
            }
            
            .task-notification-title {
                color: var(--text-main);
                font-weight: 600;
                font-size: 0.9rem;
                text-transform: uppercase;
                letter-spacing: 1px;
            }
            
            .task-notification-section {
                color: var(--primary);
                font-size: 0.8rem;
                margin-bottom: 4px;
            }
            
            .task-notification-description {
                color: var(--text-main);
                font-size: 1rem;
                margin-bottom: 8px;
                font-weight: 500;
            }
            
            .task-notification-progress {
                display: flex;
                align-items: center;
                gap: 8px;
                margin-top: 8px;
            }
            
            .task-progress-bar {
                flex-grow: 1;
                height: 4px;
                background: rgba(255,255,255,0.1);
                border-radius: 2px;
                overflow: hidden;
            }
            
            .task-progress-fill {
                height: 100%;
                background: var(--gradient-1);
                width: 0%;
                transition: width 0.3s ease;
            }
            
            .task-progress-text {
                color: var(--text-muted);
                font-size: 0.8rem;
                min-width: 45px;
            }
            
            .task-notification-close {
                position: absolute;
                top: 8px;
                right: 8px;
                background: none;
                border: none;
                color: var(--text-muted);
                cursor: pointer;
                font-size: 1.2rem;
                padding: 4px;
                line-height: 1;
            }
            
            .task-notification-close:hover {
                color: var(--primary);
            }
            
            .task-complete-toast {
                position: fixed;
                top: 20px;
                right: 20px;
                background: linear-gradient(135deg, var(--success) 0%, #40c057 100%);
                color: white;
                padding: 12px 24px;
                border-radius: 50px;
                font-family: var(--font-code);
                font-weight: 600;
                z-index: 10002;
                transform: translateX(400px);
                transition: transform 0.3s ease;
                box-shadow: 0 10px 30px rgba(81, 207, 102, 0.4);
                border: 1px solid rgba(255,255,255,0.2);
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .task-complete-toast.show {
                transform: translateX(0);
            }
            
            .task-complete-toast i {
                font-size: 1.2rem;
            }
            
            @keyframes pulse-notification {
                0% { box-shadow: 0 0 0 0 rgba(255, 80, 17, 0.7); }
                70% { box-shadow: 0 0 0 10px rgba(255, 80, 17, 0); }
                100% { box-shadow: 0 0 0 0 rgba(255, 80, 17, 0); }
            }
            
            .notification-pulse {
                animation: pulse-notification 2s infinite;
            }
        `;
        document.head.appendChild(styles);
    }

    // ==========================================
    // TASK TRACKING FUNCTIONS
    // ==========================================
    
    // Get the next incomplete task
    function getNextTask() {
        for (let task of CHRONOLOGICAL_TASKS) {
            const isCompleted = localStorage.getItem('sentinel_task_' + task.id) === 'true';
            if (!isCompleted) {
                return task;
            }
        }
        return null; // All tasks completed
    }

    // Calculate overall progress
    function getTaskProgress() {
        let completed = 0;
        for (let task of CHRONOLOGICAL_TASKS) {
            if (localStorage.getItem('sentinel_task_' + task.id) === 'true') {
                completed++;
            }
        }
        return {
            completed: completed,
            total: CHRONOLOGICAL_TASKS.length,
            percentage: (completed / CHRONOLOGICAL_TASKS.length) * 100
        };
    }

    // Show task notification
    function showTaskNotification(task) {
        // Remove existing notification if any
        const existingNotif = document.querySelector('.task-notification');
        if (existingNotif) {
            existingNotif.remove();
        }
        
        const progress = getTaskProgress();
        
        const notification = document.createElement('div');
        notification.className = 'task-notification';
        notification.innerHTML = `
            <button class="task-notification-close" onclick="this.parentElement.remove()">&times;</button>
            <div class="task-notification-header">
                <div class="task-notification-icon">!</div>
                <div class="task-notification-title">YOUR NEXT TASK</div>
            </div>
            <div class="task-notification-section">📁 ${task.section}</div>
            <div class="task-notification-description">${task.description}</div>
            <div class="task-notification-progress">
                <div class="task-progress-bar">
                    <div class="task-progress-fill" style="width: ${progress.percentage}%"></div>
                </div>
                <div class="task-progress-text">${progress.completed}/${progress.total}</div>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Trigger animation
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        // Auto-hide after 8 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.classList.remove('show');
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.remove();
                    }
                }, 300);
            }
        }, 8000);
    }

    // Show task completion toast
    function showTaskCompleteToast(task) {
        const toast = document.createElement('div');
        toast.className = 'task-complete-toast';
        toast.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <span>✓ Task Complete: "${task.description}"</span>
        `;
        
        document.body.appendChild(toast);
        
        // Trigger animation
        setTimeout(() => {
            toast.classList.add('show');
        }, 100);
        
        // Auto-hide after 3 seconds
        setTimeout(() => {
            if (toast.parentNode) {
                toast.classList.remove('show');
                setTimeout(() => {
                    if (toast.parentNode) {
                        toast.remove();
                    }
                }, 300);
            }
        }, 3000);
        
        // After showing completion, show next task notification
        setTimeout(() => {
            const nextTask = getNextTask();
            if (nextTask) {
                showTaskNotification(nextTask);
            } else {
                // All tasks completed!
                showAllTasksComplete();
            }
        }, 3500);
    }

    // Show "All Tasks Complete" celebration
    function showAllTasksComplete() {
        const celebration = document.createElement('div');
        celebration.className = 'task-notification';
        celebration.style.borderLeftColor = 'var(--success)';
        celebration.innerHTML = `
            <button class="task-notification-close" onclick="this.parentElement.remove()">&times;</button>
            <div class="task-notification-header">
                <div class="task-notification-icon" style="background: var(--success)">🎉</div>
                <div class="task-notification-title">ALL TASKS COMPLETE!</div>
            </div>
            <div class="task-notification-description" style="color: var(--success);">
                Congratulations! You've completed all security tasks.
            </div>
            <div style="margin-top: 10px; color: var(--text-muted); font-size: 0.9rem;">
                Your digital life is now more secure. Great job! 🛡️
            </div>
        `;
        
        document.body.appendChild(celebration);
        
        setTimeout(() => {
            celebration.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            if (celebration.parentNode) {
                celebration.classList.remove('show');
                setTimeout(() => celebration.remove(), 300);
            }
        }, 8000);
    }

    // ==========================================
    // TASK CHECKER AND NOTIFICATION SCHEDULER
    // ==========================================
    
    // Check and show next task on page load
    function checkAndShowNextTask() {
        setTimeout(() => {
            const nextTask = getNextTask();
            if (nextTask) {
                showTaskNotification(nextTask);
            } else {
                showAllTasksComplete();
            }
        }, 2000); // Show after 2 seconds to let page load
    }

    // Monitor checkbox changes for task completion
    function monitorTaskCompletion() {
        // Override the original handleCheckboxChange to add completion notifications
        const originalHandleCheckboxChange = window.handleCheckboxChange;
        
        window.handleCheckboxChange = function(e) {
            // Call original function to save to localStorage
            if (originalHandleCheckboxChange) {
                originalHandleCheckboxChange(e);
            }
            
            // If checkbox was checked (completed), show completion toast
            if (e.target.checked) {
                const taskId = e.target.id;
                const task = CHRONOLOGICAL_TASKS.find(t => t.id === taskId);
                if (task) {
                    showTaskCompleteToast(task);
                }
            }
            
            // Update global progress (already does this, but ensure it's called)
            if (typeof updateGlobalProgress === 'function') {
                updateGlobalProgress();
            }
        };
        
        // Also monitor for checkbox changes via event delegation
        document.addEventListener('change', function(e) {
            if (e.target.classList.contains('task-checkbox')) {
                // This will trigger the overridden handleCheckboxChange above
                // But in case it doesn't, we handle it here too
                if (e.target.checked) {
                    const taskId = e.target.id;
                    const task = CHRONOLOGICAL_TASKS.find(t => t.id === taskId);
                    if (task) {
                        // Check if we already showed a notification for this task recently
                        const lastNotified = localStorage.getItem('last_completed_notification_' + taskId);
                        const now = Date.now();
                        
                        if (!lastNotified || now - parseInt(lastNotified) > 5000) {
                            localStorage.setItem('last_completed_notification_' + taskId, now.toString());
                            showTaskCompleteToast(task);
                        }
                    }
                }
            }
        });
    }

    // Start periodic reminders
    function startPeriodicReminders() {
        // Check every 30 seconds if there's an incomplete task and show reminder
        setInterval(() => {
            // Only show if no notification is currently visible
            if (!document.querySelector('.task-notification')) {
                const nextTask = getNextTask();
                if (nextTask) {
                    // Check if last reminder was more than 2 minutes ago (to avoid spam)
                    const lastReminder = localStorage.getItem('last_task_reminder');
                    const now = Date.now();
                    
                    if (!lastReminder || now - parseInt(lastReminder) > 120000) {
                        localStorage.setItem('last_task_reminder', now.toString());
                        showTaskNotification(nextTask);
                    }
                }
            }
        }, TASK_NOTIFICATION_INTERVAL);
    }

    // ==========================================
    // INITIALIZE TASK TRACKER
    // ==========================================
    function initTaskTracker() {
        console.log('Initializing Chronological Task Tracker...');
        
        // Add styles
        addNotificationStyles();
        
        // Check and show next task on load
        checkAndShowNextTask();
        
        // Monitor task completion
        monitorTaskCompletion();
        
        // Start periodic reminders
        startPeriodicReminders();
        
        // Listen for section changes (when new content loads)
        document.addEventListener('contentLoaded', function() {
            // Small delay to let checkboxes bind
            setTimeout(() => {
                const nextTask = getNextTask();
                if (nextTask && !document.querySelector('.task-notification')) {
                    showTaskNotification(nextTask);
                }
            }, 1000);
        });
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTaskTracker);
    } else {
        initTaskTracker();
    }
