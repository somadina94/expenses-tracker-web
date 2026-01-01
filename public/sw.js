self.addEventListener("push", (event) => {
  const data = event.data?.json() || {};
  console.log(data);

  self.registration.showNotification(data.title || "Notification", {
    body: data.body,
    icon: "../assets/Logo-web.jpg",
    data: data, // optional: to handle clicks
  });
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  // Optionally, open a page
  event.waitUntil(clients.openWindow("/dashboard/notification"));
});
