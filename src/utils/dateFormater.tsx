/**
 * A many time ago the request was sended
 * @param dateString 
 * @returns  
*/

export function dateFormater(dateString: string) {

  const date = new Date(dateString);
  const now = new Date();

  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHeure = Math.floor(diffMin / 60);
  const diffJour = Math.floor(diffHeure / 24);

  if (diffJour > 0) {
      return `${diffJour} day${diffJour > 1 ? 's' : ''} ago`;
  } else if (diffHeure > 0) {
      return ` ${diffHeure} hour${diffHeure > 1 ? 's' : ''} ago`;
  } else if (diffMin > 0) {
      return `${diffMin} minute${diffMin > 1 ? 's' : ''} ago`;
  } else {
      return `${diffSec} second${diffSec > 1 ? 's' : ''} ago`;
  }
}