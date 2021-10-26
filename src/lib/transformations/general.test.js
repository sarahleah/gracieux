import { removeEditLinks, prefixBrokenAncs } from '../transformations/general'

test('removes correct portion of edit links', () => {
    let initial = '<h2><span class="mw-headline" id="Provenance">Provenance</span><span class="mw-editsection"><span class="mw-editsection-bracket">[</span><a href="/w/index.php?title=Assumption_of_the_Virgin_(El_Greco)&amp;action=edit&amp;section=2" title="Edit section: Provenance">edit</a><span class="mw-editsection-bracket">]</span></span></h2>'
    let final = '<h2><span class="mw-headline" id="Provenance">Provenance</span></h2>'
    expect(removeEditLinks(initial)).toBe(final)
})

test('prefixes href without #', () => {
    let initial = `<a href="/wiki/Assumption_of_Mary" title="Assumption of Mary">Assumption of the Virgin</a> resembles <a href="/wiki/Assumption_of_the_Virgin_(Titian)" title="Assumption of the Virgin (Titian)">Titian's Assumption</a> in the <a href="/wiki/Santa_Maria_Gloriosa_dei_Frari" title="Santa Maria Gloriosa dei Frari">Basilica dei Frari</a> in Venice with Virgin Mary and angels above and the apostles below.<sup id="cite_ref-:3_3-0" class="reference"><a href="#cite_note-:3-3">&#91;3&#93;</a></sup> On the painting Virgin Mary floats upward which symbolizes her purity, while apostles gathered around her empty tomb express amazement and concern.<sup id="cite_ref-:1_2-1" class="reference"><a href="#cite_note-:1-2">&#91;2&#93;</a></sup>`
    let final = `<a href="https://en.wikipedia.org/wiki/Assumption_of_Mary" title="Assumption of Mary">Assumption of the Virgin</a> resembles <a href="https://en.wikipedia.org/wiki/Assumption_of_the_Virgin_(Titian)" title="Assumption of the Virgin (Titian)">Titian's Assumption</a> in the <a href="https://en.wikipedia.org/wiki/Santa_Maria_Gloriosa_dei_Frari" title="Santa Maria Gloriosa dei Frari">Basilica dei Frari</a> in Venice with Virgin Mary and angels above and the apostles below.<sup id="cite_ref-:3_3-0" class="reference"><a href="#cite_note-:3-3">&#91;3&#93;</a></sup> On the painting Virgin Mary floats upward which symbolizes her purity, while apostles gathered around her empty tomb express amazement and concern.<sup id="cite_ref-:1_2-1" class="reference"><a href="#cite_note-:1-2">&#91;2&#93;</a></sup>`
    expect(prefixBrokenAncs(initial)).toBe(final)
})