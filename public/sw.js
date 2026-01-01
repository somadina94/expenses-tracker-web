self.addEventListener("push", (event) => {
  const data = event.data?.json() || {};

  self.registration.showNotification(data.title || "Notification", {
    body: data.body,
    data: data,
    notificationId: data.notificationId,
  });
});

self.addEventListener("notificationclick", (event) => {
  const notificationId = event.notification.notificationId;

  event.notification.close();

  event.waitUntil(
    clients.openWindow(`/dashboard/all-notification/${notificationId}`)
  );
});
