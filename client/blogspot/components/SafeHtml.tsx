import { sanitizeOptions } from '@/config/sanitizeOptions'
import sanitizeHtml from 'sanitize-html';

const SafeHtml = ({html}) => {
    return (
        <label dangerouslySetInnerHTML={{__html: sanitizeHtml(html, sanitizeOptions) }}></label>
    )
}
export default SafeHtml