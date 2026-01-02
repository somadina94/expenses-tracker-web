self.addEventListener("push", (event) => {
  const data = event.data?.json() || {};

  self.registration.showNotification(data.title || "Notification", {
    body: data.body,
    data: data,
  });
});

self.addEventListener("notificationclick", (event) => {
  const notificationId = event.notification.data.notificationId;

  event.notification.close();

  event.waitUntil(
    clients.openWindow(`/dashboard/all-notification/${notificationId}`)
  );
});
