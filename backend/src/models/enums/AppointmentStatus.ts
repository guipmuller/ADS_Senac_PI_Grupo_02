enum AppointmentStatus {
  SCHEDULED = 'Scheduled',
  COMPLETED = 'Completed',
  CANCELLED = 'Canceled',
}

function updateStatus(status: AppointmentStatus) {
  console.log('Status:', status);
}

updateStatus(AppointmentStatus.SCHEDULED);