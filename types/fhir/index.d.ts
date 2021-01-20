// Type definitions for FHIR Release 3.0

declare module fhir {
    /**
     * Any combination of letters, numerals, "-" and ".", with a length limit of 64 characters.  (This might be an integer, an unprefixed OID, UUID or any other identifier pattern that meets these constraints.)  Ids are case-insensitive.
     */
    type id = string;
    /**
     * A date or partial date (e.g. just year or year + month). There is no time zone. The format is a union of the schema types gYear, gYearMonth and date.  Dates SHALL be valid dates.
     */
    type date = string;
    /**
     * A date, date-time or partial date (e.g. just year or year + month).  If hours and minutes are specified, a time zone SHALL be populated. The format is a union of the schema types gYear, gYearMonth, date and dateTime. Seconds must be provided due to schema type constraints but may be zero-filled and may be ignored.                 Dates SHALL be valid dates.
     */
    type dateTime = string;
    /**
     * A rational number with implicit precision
     */
    type decimal = number;
    /**
     * The use of an address
     */
    type AddressUse = 'home' | 'work' | 'temp' | 'old';
    /**
     * The type of an address (physical / postal)
     */
    type AddressType = 'postal' | 'physical' | 'both';
    /**
     * The gender of a person used for administrative purposes
     */
    type AdministrativeGender = 'male' | 'female' | 'other' | 'unknown';
    /**
     * The free/busy status of an appointment
     */
    type AppointmentStatus =
        | 'proposed'
        | 'pending'
        | 'booked'
        | 'arrived'
        | 'fulfilled'
        | 'cancelled'
        | 'noshow'
        | 'entered-in-error';
    /**
     * Current state of the encounter
     */
    type EncounterStatus =
        | 'planned'
        | 'arrived'
        | 'triaged'
        | 'in-progress'
        | 'onleave'
        | 'finished'
        | 'cancelled'
        | 'entered-in-error'
        | 'unknown';
    /**
     * Indicates whether the location is still in use
     */
    type LocationStatus = 'active' | 'suspended' | 'inactive';
    /**
     * Possible service areas for med techs
     */
    type ServiceArea = 'north-bay' | 'south-bay' | 'los-angeles';
    /**
     * Time range defined by start and end date/time
     */
    interface Period {
        /**
         * Starting time with inclusive boundary
         */
        startTime: dateTime;
        /**
         * End time with inclusive boundary, if not ongoing
         */
        endTime: dateTime;
    }
    /**
     * An location expressed using postal conventions (as opposed to GPS or other location definition formats)
     */
    interface Address {
        /**
         * home | work | temp | old - purpose of this address
         */
        use: AddressUse;
        /**
         * postal | physical | both
         */
        type?: AddressType;
        /**
         * Text representation of the address
         */
        text?: string;
        /**
         * Street name, number, direction & P.O. Box etc.
         */
        line: string;
        /**
         * Name of city, town etc.
         */
        city: string;
        /**
         * District name (aka county)
         */
        district?: string;
        /**
         * Sub-unit of country (abbreviations ok)
         */
        state: string;
        /**
         * Postal code for area
         */
        postalCode: string;
        /**
         * Country (e.g. can be ISO 3166 2 or 3 letter code)
         */
        country: string;
    }
    /**
     * The absolute geographic location
     */
    interface LocationPosition {
        /**
         * Longitude with WGS84 datum
         */
        longitude: decimal;
        /**
         * Latitude with WGS84 datum
         */
        latitude: decimal;
        /**
         * Altitude with WGS84 datum
         */
        altitude?: decimal;
    }
    /**
     * Details and position information for a physical place
     */
    interface Location {
        /**
         * Unique code or number identifying the location to its users
         */
        identifier?: id;
        /**
         * active | suspended | inactive
         */
        status?: LocationStatus;
        /**
         * Name of the location as used by humans
         */
        name?: string;
        /**
         * A list of alternate names that the location is known as, or was known as in the past
         */
        alias?: string[];
        /**
         * Additional details about the location that could be displayed as further information to identify the location beyond its name
         */
        description?: string;
        /**
         * Physical location
         */
        address: Address;
        /**
         * The absolute geographic location
         */
        position: LocationPosition;
        /**
         * Another Location this one is physically part of
         */
        partOf?: Location;
        /**
         * Phone number
         */
        phone?: string;
        /**
         * Email
         */
        email?: string;
    }
    /**
     * Information about an medical technician providing health care services
     */
    interface MedTech {
        /**
         * An identifier for this med tech
         */
        identifier?: id;
        /**
         * Whether this med tech's record is in active use
         */
        active?: boolean;
        /**
         * A name associated with the med tech
         */
        name: string;
        /**
         * A phone number for the med tech
         */
        phone: string;
        /**
         * A email for the med tech
         */
        email: string;
        /**
         * Current location of the med tech
         */
        location: Location;
        /**
         * Working location of the med tech (hospital, office building, etc.)
         */
        workLocation: Location;
        /**
         * Availabilities related to the med tech
         */
        availabilites: Period[];
        /**
         * Schedule related to the med tech
         */
        schedule: Period;
        /**
         * Areas the med tech will service
         */
        serviceAreas: ServiceArea[];
        /**
         * Appointments the med tech has upcoming
         */
        appointments?: Appointment[];
    }
    /**
     * Information about an individual receiving health care services
     */
    interface Patient {
        /**
         * An identifier for this patient
         */
        identifier?: id;
        /**
         * Whether this patient's record is in active use
         */
        active?: boolean;
        /**
         * A name associated with the patient
         */
        name: string;
        /**
         * A phone number for the patient
         */
        phone: string;
        /**
         * A email for the patient
         */
        email: string;
        /**
         * Location of the patient that is not role specific (typically home location)
         */
        location: Location;
        /**
         * male | female | other | unknown
         */
        gender: AdministrativeGender;
        /**
         * The date on which the patient was born
         */
        birthDate: date;
        /**
         * Service area the patient resides in
         */
        serviceArea?: ServiceArea;
    }
    /**
     * A booking of a healthcare event among patient(s), practitioner(s), related person(s) and/or device(s) for a specific date/time. This may result in one or more Encounter(s)
     */
    interface Appointment {
        /**
         * An identifier for this appointment corresponding to the encounter (and service request if applicable)
         */
        identifier?: id;
        /**
         * proposed | pending | booked | arrived | fulfilled | cancelled | noshow | entered-in-error
         */
        status: AppointmentStatus;
        /**
         * Shown on a subject line in a meeting request, or appointment list
         */
        description?: string;
        /**
         * The start and end time of the appointment
         */
        period: Period;
        /**
         * The date that this appointment was initially created
         */
        created: dateTime;
        /**
         * Additional comments
         */
        comment?: string;
        /**
         * Patient involved in appointment
         */
        patient: Patient;
        /**
         * Med Tech involved in appointment
         */
        medTech: MedTech;
    }
    /**
     * An interaction during which services are provided to the patient
     */
    interface Encounter {
        /**
         * An identifier for this encounter corresponding to the appointment
         */
        identifier: id;
        /**
         * planned | arrived | triaged | in-progress | onleave | finished | cancelled +
         */
        status: EncounterStatus;
        /**
         * The patient present at the encounter
         */
        patient: Patient;
        /**
         * The med tech present at the encounter
         */
        medTech: MedTech;
        /**
         * The appointment that scheduled this encounter
         */
        appointment: Appointment;
        /**
         * The start and end time of the encounter
         */
        period: Period;
        /**
         * The location of this encounter
         */
        location: Location;
    }
}
