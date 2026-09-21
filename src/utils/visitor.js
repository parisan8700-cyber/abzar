const VISITOR_ID_KEY = "abzar_kashmar_visitor_id";

export const getVisitorId = () => {
    if (typeof window === "undefined") {
        return null;
    }

    let visitorId = localStorage.getItem(VISITOR_ID_KEY);

    if (!visitorId) {
        visitorId = crypto.randomUUID();

        localStorage.setItem(
            VISITOR_ID_KEY,
            visitorId
        );
    }

    return visitorId;
};