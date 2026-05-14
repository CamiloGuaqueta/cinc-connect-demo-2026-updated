/* ============================================
   CINC Connect Demo — Notifications Data
   Shared between notifications.html and notification-detail.html
   ============================================ */

(function () {
  'use strict';

  const NOTIFICATIONS = [
    {
      id: 'tennis-tournament',
      type: 'bell',
      title: 'Tennis tournament Fo…',
      titleFull: 'Tennis tournament Form',
      preview: 'Tennis tournament for all magic city condo tennis players start Monday may 29 at 10AM please make sure…',
      body: 'Hi tennis players!\nWe are organizing a tournament for all magic city condo tennis players. It starts Monday, May 29 at 10:00 AM at the community courts.\n\nPlease make sure to bring your own racquet, water bottle, and arrive 15 minutes early for registration. Snacks and drinks will be provided.\n\nLet us know if you want to participate by replying to this notification.',
      dateLabel: '05/22/2026 2:58 PM',
      time: '2:58 PM'
    },
    {
      id: 'bbq-4th-july',
      type: 'cal',
      title: '4th of July BBQ at the Pool',
      titleFull: '4th of July BBQ at the Pool',
      preview: 'You are all invited to Join us on Sunday 4th of July for a Magical Night City ni…',
      body: 'You are all invited to join us on Sunday, July 4th for a magical night.\n\nWe will have a BBQ at the pool starting at 5:00 PM with food, drinks, and live music. Fireworks at sunset.\n\nFamily friendly event. RSVP via the community calendar.',
      dateLabel: '07/03/2026 9:00 AM',
      time: '1 day ago'
    },
    {
      id: 'payment-reminder',
      type: 'dollar',
      title: 'Payment Reminder',
      titleFull: 'Payment Reminder',
      preview: 'Your Payment is now due please make a payment as soon as possible to avoid any late fees',
      body: 'Hi homeowner,\n\nYour monthly assessment payment is now due. Please make a payment as soon as possible to avoid any late fees.\n\nYou can pay through the Financial Hub in the app. If you have set up autopay, your payment will be processed automatically.\n\nThanks for keeping your account up to date.',
      dateLabel: '03/03/2026 12:22 PM',
      time: '2 days ago'
    },
    {
      id: 'shift-log',
      type: 'dollar',
      title: 'New High Priority Shift Log Entry',
      titleFull: 'Net Repair Completion',
      preview: 'Preview Test',
      body: 'Hi pickballers!\nI\'m happy to inform you that nets have been fixed and you can now reserve the court again.\n\nThanks for your patience!',
      dateLabel: '03/03/2025 12:22 PM',
      time: '8 days ago'
    }
  ];

  function findById(id) {
    return NOTIFICATIONS.find((n) => n.id === id);
  }

  window.NotificationsData = { NOTIFICATIONS, findById };
})();
