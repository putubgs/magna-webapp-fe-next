/**
 * Global API client wrapper that handles authentication errors
 * Dispatches custom event when 401 Unauthorized is detected
 */

export async function apiClient(
  url: string,
  options?: RequestInit
): Promise<Response> {
  try {
    const response = await fetch(url, {
      ...options,
      credentials: "include", // Always include cookies
    });

    // Check for authentication errors
    if (response.status === 401) {
      // Dispatch custom event for unauthorized access
      const event = new CustomEvent("api-unauthorized", {
        detail: { status: 401, url },
      });
      window.dispatchEvent(event);
    }

    return response;
  } catch (error) {
    console.error("API request failed:", error);
    throw error;
  }
}

/**
 * Helper function to check if a fetch response indicates authentication failure
 */
export function isUnauthorized(response: Response): boolean {
  return response.status === 401;
}

/**
 * Helper to handle unauthorized responses
 */
export function handleUnauthorizedResponse(url: string) {
  const event = new CustomEvent("api-unauthorized", {
    detail: { status: 401, url },
  });
  window.dispatchEvent(event);
}
