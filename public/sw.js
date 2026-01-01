self.addEventListener("push", (event) => {
  const data = event.data?.json() || {};
  console.log("notification data:", data);

  self.registration.showNotification(data.title || "Notification", {
    body: data.body,
    data: data,
  });
});

self.addEventListener("notificationclick", (event) => {
  const data = event.notification.data;
  console.log("notification data:", data);

  event.notification.close();

  event.waitUntil(
    clients.openWindow(`/dashboard/all-notification/${data.notificationId}`)
  );
});
