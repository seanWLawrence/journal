/* THIS WILL ONLY BE RUN ONE TIME TO CREATE THE JOURNAL DATABASE */

/* DELETE journal database if it already exists */
DROP DATABASE IF EXISTS journal;

/* CREATE new journal database */
CREATE DATABASE journal;

/* Connect to journal database */
\c journal;