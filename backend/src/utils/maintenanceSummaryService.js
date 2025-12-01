export function toSimpleRequests(requests) {
  return requests.map((r) => ({
    id: r.id,
    location: r.facility.location,
    category: r.facility.name,
    priority: r.priority,
    status: r.status,
    description: r.description?.slice(0, 200) || "",
  }));
}
