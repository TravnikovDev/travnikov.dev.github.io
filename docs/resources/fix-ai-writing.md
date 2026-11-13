# Fix AI Writing

By [Roman Travnikov](https://travnikov.dev/)

Public edition | 13 November 2026

## Purpose and enforcement

Remove the AI-writing patterns listed in this guide from the final text. Treat every prohibition as a requirement. Do not merely reduce frequency, allow an occasional occurrence, or decide that a prohibited pattern sounds acceptable in context. Rewrite until none of the applicable prohibited patterns remain.

This guide covers prose, formatting, and the factual accuracy of a rewrite. The assignment defines the content and required format.

The prohibited examples below are instructions for the editor. They must not be copied into the cleaned output. Use the examples to identify a pattern, then rewrite the passage without changing its intended meaning.

A style audit and an external AI-detector result are separate checks. Compliance with this guide cannot establish human authorship or predict a detector's label. Never describe an untested passage as having passed Pangram or another external check.

For a short evaluation rationale, apply the Short evaluation rationales section first to determine what the text needs to say. Use the prohibition catalog to inspect the resulting wording. This order does not waive any prohibition.

## Core standard

Write like a thoughtful person addressing the actual situation. Use concrete facts, familiar words, direct sentences, and only necessary structure. Preserve the assigned persona's voice in prompts and use a plain professional voice in evaluator material.

Start with the substance and stop when the required information is complete. Every sentence must contribute information, explain a relationship, or supply necessary context. For short prompts, explanations, and justifications, default to one coherent paragraph.

Preserve meaning, factual content, exact identifiers, required labels, and the intended register. Never invent facts, sources, quotations, interviews, personal experience, feelings, or opinions to simulate a human author. Do not delete necessary information merely to avoid a sentence pattern; express it differently.

Fixed identifiers, source titles, required task labels, and executable syntax retain their spelling. This protection does not authorize repeating prohibited prose around them. The ban on U+2014 is absolute throughout the cleaned output. If a quotation contains it, paraphrase the passage and remove quotation marks; never silently alter a quotation and present it as verbatim.

## Short evaluation rationales

Use this section for a rating explanation, comparison justification, or a field limited to one or two sentences. Ground the wording in the evaluator's actual judgment and the supplied evidence.

* Identify the requested criterion and the actual decision before drafting. Do not invent a ranking, tie, or reason. If these inputs are missing, keep the analysis provisional and identify the missing input outside the submitted rationale.
* Lead with the finding that explains the decision. Include the observation that supports it. A list of what each response says is insufficient when the task asks why a rating is justified.
* Select the evidence that affects the criterion. Do not compress every visible response action into a polished inventory of verbs. Keep additional details only when they contribute to the judgment.
* Describe the exact behavior. Distinguish acknowledging a previous mistake from correcting it, and failing to display information from proving that information does not exist.
* Use verbs that the evidence supports. "Admit" requires acknowledgment; "verified" requires an actual check. Do not intensify a neutral observation to make the rationale sound decisive.
* Use ordinary English appropriate to evaluator material. Preserve the evaluator's actual point without inventing an emotional reaction, personal experience, or expertise.
* Use genuine author-written rationales from the same task type as voice references when available. Conversational questions do not establish how the author writes a finished rating explanation. Match the reference's specificity and register without copying its wording or turning it into a repeated template.
* Use a second sentence only when another reason or an evidential limitation is needed. Do not force every rationale into the same two-sentence template.
* Keep the field's sentence limit. Do not pad, duplicate, or append unrelated material to reach a detector's minimum input length. Do not add headings, editing notes, authorship claims, or detector commentary inside the rationale.

These rules improve relevance and precision. A detector outcome remains unknown until the exact final field text has been checked by the relevant integration.

## Author voice

Use the author's established voice when writing on their behalf. An assigned persona determines the speaker in task prompts. Evaluator material keeps the plain professional register required elsewhere in this guide. Every prohibition in the guide still applies.

The voice should make the intended result explicit through ordinary conversational English. Keep the concrete context that explains the request. Preserve the author's actual preferences and degree of certainty. Correct grammar and remove accidental repetition while keeping the purpose of the message intact.

### Developing a thought

* Begin with the actual situation, question, or requested action. Supply the background needed to understand it without a ceremonial introduction.
* Let the explanation move toward a specific result. Put a condition beside the statement it qualifies so the reader can see exactly what is being requested.
* Keep concrete constraints visible. Preserve the requested currency, named tools, quantities, and decisions established earlier in the conversation. Do not silently broaden the task or reopen settled choices.
* Use a real question when the author is trying to understand something. A short sequence of related questions can examine the same uncertainty from different angles. Do not turn it into a rhetorical question followed by an answer.
* Use conditional reasoning when a choice changes the outcome: describe the condition and ask about its consequence. Do not add a hypothetical scenario unrelated to the author's actual problem.
* In a follow-up, refer to established context without repeating the whole discussion. Include enough information for the intended recipient to identify the item or decision being discussed.
* State a strong preference directly when the source expresses one. Keep uncertainty about facts explicit. Confidence in a preference must not become confidence in an unverified claim.

### English wording and rhythm

Use idiomatic English with familiar verbs. Contractions such as "I'm", "it's", and "don't" are suitable when they fit the register. Keep technical terms that are normal working vocabulary for the task. Explain unfamiliar terms through the concrete example the author is asking about.

Use conversational markers such as "Okay" or "So" only when they serve the turn. Do not insert them into every paragraph, reproduce repeated openings, or add fillers to simulate speech. Avoid untranslated filler and phonetic imitations of another language. Keep the prose and examples in this profile in English.

Let a simple point take a short sentence. Use a longer sentence when a condition or explanation needs room. Correct spelling, agreement, and word order. Remove transcription errors and false starts after identifying the author's intended meaning. Do not insert mistakes or awkward English as a personal signature.

### Tone and amount of detail

Keep politeness brief and relevant to the request. A direct question or instruction can include "please" without a formal preamble. When the author expresses dissatisfaction, identify the concrete mismatch and the requested correction. Do not add insults, profanity, or stronger emotion than the source supports. The existing restrictions on task prompts remain binding.

A long exploratory input can require a short finished message. Use one coherent paragraph for a short rewrite unless another format is requested. Research and comparisons can use more structure when the task calls for it. Match the finished output to its purpose; do not copy the length or disfluency of the input.

Use first person only for statements the author actually makes or information established in context. Use "we" only when the source supports a shared task or position. Never manufacture lived experience, personal reactions, or agreement to make the text sound authored.

### English examples

These examples illustrate phrasing. They are not verbatim quotations or claims about work already completed.

| Situation | Example wording |
| --- | --- |
| Checking continuity with earlier work | How much of the original guidance is still in this guide? Please explain which parts you kept. |
| Stating a format constraint | Please put all prices in dollars. I need the same currency throughout the comparison. |
| Testing a condition | If I use the API, how much will it cost? |
| Limiting a design change | Keep the bot's current design. You can change its pose. |

During a rewrite, keep the intention behind a correction or repeated phrase. Express it once in a direct requirement. If the source uses a prohibited construction, find another way to state the same fact. Authenticity does not create an exception to the bans.

## Prohibited content patterns

* C01. Generic smoothing. Do not replace distinctive facts with vague praise, broad characterizations, or statements that would fit almost any subject. State the known action, object, person, boundary, and consequence.
* C02. Inflated significance. Do not add claims about importance, legacy, historical turning points, enduring impact, transformative power, or broader trends. Ban formulations such as "plays a pivotal role", "is a testament to", "reflects broader trends", "setting the stage for", "marking a significant shift", "focal point", "indelible mark", and "deeply rooted". Replace them with the actual event or consequence established by the source.
* C03. Manufactured debates and symbolism. Do not claim that a topic raises philosophical questions, sparks debate, blurs boundaries, symbolizes unity, or shapes policy discussions without a specific supported event or argument to report. Do not attach a larger meaning merely to make an ordinary fact sound consequential.
* C04. Ecological and conservation padding. Do not append generic ecosystem, cultural-heritage, sustainability, threat, preservation, or research-effort claims. Do not invent conservation work or ecological importance when the available facts do not establish it.
* C05. Notability and media-coverage promotion. Do not advertise that a subject has "independent coverage", appears in "prominent media outlets" or "trade publications", was "cited/featured/profiled in" publications, or has an "active social media presence". Do not promote a source as "written by a leading expert". Report the substantive fact from a source instead of displaying a list of outlets or their prestige.
* C06. Source-identification narration. Do not write "databases identify", "records list", "materials describe", "is listed in", or "his/her professional profile lists" as an indirect way to state an ordinary fact. State the fact directly, with specific attribution when its status requires attribution.
* C07. Superficial analysis. Do not append significance or interpretation clauses beginning with highlighting, underscoring, emphasizing, ensuring, reflecting, symbolizing, contributing, cultivating, fostering, encompassing, enhancing, demonstrating, or confirming. Remove the interpretation or state a separately supported factual consequence. Never attribute the editor's interpretation to a source that does not make it.
* C08. Vague association. Do not write "associated with", "connected to/with", "in connection with/to", or "in association with" to conceal an unspecified relationship. Name the actual relationship, role, action, or affiliation. If it is unknown, do not invent it.
* C09. Vague authorities and inflated consensus. Do not use "experts say", "observers have cited", "industry reports", "some critics argue", "researchers believe", or unnamed "scholars". Identify the actual source and its claim. Do not turn one author's position into a field-wide consensus, inflate the number of sources, or use "several sources/publications" when the actual count does not justify it.
* C10. False non-exhaustiveness. Do not introduce a complete source list with "such as", "including", "among others", or "for example" when that would imply additional known items. Make the scope of the list accurate.
* C11. Formulaic challenges and future prospects. Do not use the sequence "Despite its success... faces challenges... Despite these challenges... continues to thrive". Do not add speculative improvement plans, optimistic forecasts, or automatic "Future outlook", "Challenges and legacy", or "Challenges and future prospects" endings. Report only established problems and actual plans relevant to the request.
* C12. Stock recognition sections and paired headings. Do not create "Awards and recognition", "Recognition", or formulaic "X and Y" section titles. Report relevant awards as facts under a specific heading or in the existing prose. Do not build a prestige section from vague recognition or coverage.
* C13. Titles presented as entities. Do not define a list title, article title, parenthetical disambiguator, or broad topic label as if it were a proper name or independent real-world object. Do not write "List of X is a curated compilation" or "Catchment area (health) refers to". Begin with the actual subject.
* C14. Promotional and travel-brochure prose. Do not use sales language, grand praise, scenery admiration, corporate dedication claims, inspirational slogans, or unsupported statements of uniqueness. Ban promotional descriptions such as "nestled in", "in the heart of", "a gateway to", "rich cultural heritage", "natural beauty", "worth visiting", and "commitment to excellence". State concrete attributes.
* C15. Biased defaults. Do not substitute a Western default for the stated location or culture, invent facts about a less familiar language, adopt state-media or other partisan claims as neutral fact, or apply weaker scrutiny to authoritarian governments. Keep attribution, evidential standards, and relevant local context consistent. Do not add a political stance absent from the source or assigned persona.

## Prohibited vocabulary and filler

The following are a strict blocklist in rewritten prose, including their inflections and capitalization variants. Rewrite the sentence, remove an empty claim, or choose a plain accurate alternative. Do not retain a word because it appears only once. Literal technical meanings explicitly distinguished below are not rhetorical uses.

* V01. Core lexical blocklist: additionally; bolster; crucial; deep dive; delve; emphasize; enduring; enhance; foster; garner; highlight as an emphasis verb; interplay; intricate; intricacies; meticulous; meticulously; pivotal; robust; showcase; testament; underscore as an emphasis verb; valuable; vibrant; key as an importance adjective; challenge; clearer; dependable; echo as a reporting verb; leverage as a verb; matters as an importance claim; multifaceted; practical; prioritize; quietly; steady; universally.
* V02. Figurative and promotional blocklist: align with; resonate with; boasts; landscape as an abstract metaphor; tapestry as an abstract metaphor; rich as praise; profound; exemplify; commitment to; natural beauty; nestled; in the heart of; groundbreaking; renowned; featuring; diverse array; breathtaking; must-visit; stunning; seamless; cutting-edge; innovative; transformative; compelling; comprehensive; holistic; nuanced; paradigm shift; fundamental shift; game-changer; harness as an abstract verb; navigate as a metaphor; realm; embark on a journey; myriad; plethora; synergy; ecosystem outside its literal technical or biological meaning; revolutionize; streamline; spearhead; labyrinth and symphony as metaphors; imperative; overarching; unprecedented.
* V03. Scientific-sounding camouflage. Do not insert "causal", "empirical", or "correlate" to make an unsupported observation sound scientific. Do not substitute scientific vocabulary for missing evidence. Preserve a necessary literal technical term only when it describes the actual method or finding.
* V04. Canned openings and fillers. Do not use "It is important to note", "It is worth noting", "It is crucial to understand", "It bears mentioning", "At its core", "At the end of the day", "In today's fast-paced world", "In today's digital landscape", "When it comes to", "Moving forward", "With that in mind", or "That being said". Begin with the fact.
* V05. Formulaic transitions. Do not use "Furthermore", "Moreover", "Consequently", "Subsequently", "Nevertheless", "Nonetheless", "Notably", "Indeed", "Hence", or "Thus" as stock sentence or paragraph openers. Express the actual connection with plain language or omit the connector. Do not replace one repeated connector with another repeated formula.
* V06. Announced conclusions. Do not use "In summary", "In conclusion", "To sum up", "Overall" as a summary opener, "The bottom line", "The takeaway", "Only time will tell", "The future looks bright", "Exciting times lie ahead", or "Start your journey today". Do not append a recap that repeats completed information.

## Prohibited grammar, rhetoric, and rhythm

* G01. Avoidance of basic verbs. Do not replace is, are, has, wrote, moved, used, tried, or died with elaborate or euphemistic constructions. Ban "serves as", "stands as", "functions as", "operates as", "represents a", "marks a", "holds the distinction of", and marketing uses of features, maintains, or offers when the intended meaning is simply is or has. Do not use "refers to" to avoid naming the subject directly.
* G02. Negative parallelism. Do not use "not only X but also Y", "not just X", "not X but Y", "it is not X; it is Y", "no X, no Y, just Z", "Y rather than X", or the reversed "Rather than X, Y". The ban also covers the same contrast distributed across consecutive sentences. State the positive fact directly. Preserve a necessary logical distinction using independent factual statements.
* G03. Rule-of-three rhetoric. Do not use three-item adjective stacks, three-part slogans, or coordinated three-part phrases to make prose sound complete. Express necessary facts as separate statements or in a required data format; never drop a real fact to shorten a triad.
* G04. Elegant variation and synonym cycling. Do not rotate through new names for the same person, object, concept, or event to avoid repetition. Use stable terminology and ordinary pronouns where their referents remain clear.
* G05. Mechanical symmetry. Do not repeat identical sentence openings, mirrored A/B constructions, identical list lengths, or the same setup-explanation-takeaway template across sections. Let the information determine the structure.
* G06. Mechanical cadence and punctuation. Do not force every sentence into a fixed range, including an 8-20-word template, or produce a sequence of similarly short sentences. Do not restrict punctuation to commas and periods as a substitute for em dashes. Use grammatical sentence variation and appropriate parentheses, colons, or semicolons without decorative punctuation or artificial roughness.
* G07. Rhetorical question-and-answer and dramatic reveals. Do not use "What does this mean? It means", "The result?", "Here's the thing", "Here's what nobody tells you", "Let's dive in", "Let's unpack this", or "Let's break this down". State the information directly.
* G08. False ranges. Do not write "from X to Y" when X and Y do not form a real scale, time interval, or meaningful range. Name the topics directly.
* G09. Repeated section and paragraph summaries. Do not add a conclusion to each section, restate each paragraph's point at its end, or append an automatically balanced positive-negative-inspiring close. Stop when the point is complete; do not leave a necessary argument unfinished.

* G10. Unnecessary conjunctions. Minimize conjunctions, especially "and" and "or". Review every occurrence in the finished prose. Remove it or restructure the sentence whenever a natural version preserves the facts and intended relationship. Use "and" or "or" only when unavoidable for accurate meaning or grammatical wording within the required format. Do not chain independent claims merely to pack them into one sentence. Do not substitute comma splices, slash shorthand, synonym connectors, or a series of semicolons. Preserve joint requirements and genuine alternatives. Keep necessary causal or conditional relationships explicit. Respect the field's sentence limit.

## Prohibited chatbot and editorial residue

* U01. Assistant preambles and acknowledgments. Do not include "Here is a", "Here are several", "Answer:", "Of course", "Certainly", "Absolutely", "Great question", "You're absolutely right", "I hope this helps", "I hope/trust this message finds you well", "Dear Wikipedia Editorial Team", or "I am writing to" as canned scaffolding. Do not label the deliverable "a Wikipedia-style article" or narrate what the next section will discuss.
* U02. Follow-up offers and engagement bait. Do not append "Would you like", "Is there anything else", "Let me know", "Feel free to", requests for more engagement, or offers to expand, format, submit, or continue the work.
* U03. Prewriting advice and hidden notes. Do not leave instructions to the author, upload suggestions, image recommendations, submission steps, version notes, prompts, reasoning, or "delete this section before submission" text in the deliverable, including HTML comments and infobox fields. Do not expose the task contract, evaluator instructions, or editing checklist.
* U04. Didactic disclaimers. Do not insert generic reminders to be careful, check local rules, verify before publishing, avoid confusion, or follow guidelines. Preserve a necessary factual limitation or safety requirement in direct task-specific wording; remove the canned advisory wrapper.
* U05. Search and availability disclaimers. Do not write "While specific details are limited/scarce", "not widely documented/disclosed", "in the provided/available sources/search results", or "based on available information". Failure to find a fact does not establish that it is unavailable or private. Do not speculate to fill a gap or invent a reason someone "keeps a low profile".
* U06. Corrective framing. Do not write "should be treated/presented as X rather than Y", "does not by itself establish", "the available information does not establish", or "should not be confused with". State the supported category, distinction, or exact uncertainty directly without an invented misconception or lecture to the reader.
* U07. Knowledge-cutoff residue. Do not include "Up to my last training update", "As of my last knowledge update", training dates, or statements about the model's knowledge limitations. Keep real dates that describe the evidence or event itself.
* U08. Copied refusals and model identity. Do not leave "As an AI language model", "As a large language model", "I cannot offer medical advice, but", or boilerplate apologies and alternative-service offers in cleaned content. This is a prose-editing rule and does not authorize prohibited assistance or false claims about the system's capabilities.
* U09. Placeholders. Do not leave bracketed fill-in instructions, generic sample names presented as facts, TODO/TBD fields, "Add if available", "Evidence to be supplied", "URL", "SOURCE_PUBLISHER", INSERT_SOURCE_URL, INSERT_WEBSITE_URL_HERE, PASTE_SPOTIFY_TRACK_URL_HERE, PASTE_YOUTUBE_VIDEO_URL_HERE, example.com/source-style fake links, or dates containing XX/xx. Resolve a field from established facts or remove the unsupported field or claim. Retain template slots only when the requested deliverable is explicitly a reusable template, not a finished rewrite.
* U10. Truncation. Do not return cut-off sentences, incomplete words, unfinished lists, unclosed markup, or "continue generating" residue. Do not reconstruct missing factual content by guessing.
* U11. Unrequested editorial reports. Do not append an explanation of how the text was humanized, a changes table, multiple alternative rewrites, or a self-assessment unless the user requested it. Perform the checks silently.

## Prohibited formatting and markup

* F01. Em dashes. Do not emit the U+2014 character anywhere in the cleaned output. Zero occurrences are permitted. Rewrite the sentence with an appropriate stop or clause structure. Do not replace it with a decorative double hyphen or an en dash used for the same dramatic effect.
* F02. Curly quotation marks and apostrophes. Do not use U+2018, U+2019, U+201C, or U+201D in generated prose. Use straight quotation marks and apostrophes consistently.
* F03. Decorative emphasis. Do not decorate prose with boldface, italics, emoji, slogans, or thematic breaks. Do not place emoji before headings or list entries. Do not add emphasis to simulate importance.
* F04. Inline-header vertical lists. Do not turn a paragraph into a stack of bold labels followed by colons. Use a normal paragraph for short text and ordinary bullets only for an actual list or checklist.
* F05. Heading capitalization and hierarchy. Do not use title case for ordinary section headings, insert an unnecessary article-title heading, repeat level-1 headings, or skip heading levels. Use sentence case. In Wikipedia article text, do not insert a level-1 title heading. Preserve an explicitly required document title as given.
* F06. Wrong-format markup. Do not leave Markdown in a destination that requires wikitext or plain text. Remove stray asterisks, number-sign headings, horizontal-rule strings, triple-backtick wrappers, and fenced "wikitext" article blocks. Do not mix Markdown and wikitext. Use the destination's actual link syntax; do not invert a Markdown link's label and URL. Required executable code and literal templates use their proper syntax.
* F07. Internal citation and interface artifacts. Do not expose contentReference[oaicite:1], oaicite markers, turn/search IDs, raw citation-tool tokens, unrendered source-object fields, or chatbot styling wrappers. Replace them with genuine citations in the required format or remove the artifact without leaving a falsely supported claim.
* F08. Invented categories and templates. Do not create links to nonexistent categories, invoke nonexistent templates, or guess template names and parameters. Use only a verified valid structure needed by the requested format.
* F09. Unnecessary code styling. Do not use backticks around ordinary words, filenames, values, names, quotations, or rubric text. Use fenced code blocks only for executable code or a literal required template. Use tables only for exact mappings, comparisons, or required formats.

## Prohibited citation defects

* R01. Fabricated sources. Do not invent publications, authors, article titles, publishers, interviews, source quotations, identifiers, URLs, page numbers, or access dates. Do not claim to have verified a source that was not checked.
* R02. Broken and guessed links. Do not add nonexistent sites, fabricated URL paths, malformed links, or knowingly broken citations. Verify the actual destination when adding or correcting a citation. Do not claim that a source is fictitious merely because it is paywalled, inaccessible to the editor, or has moved. Do not manufacture a replacement URL.
* R03. Invalid identifiers. Do not output an invalid ISBN checksum, an unresolvable DOI, or a guessed PMID or other scholarly identifier. Validate the identifier and its bibliographic match before adding it.
* R04. Real identifiers attached to unrelated sources. Do not attach a working DOI, PMID, ISBN, or URL to the wrong work. Confirm the title, author, year, and actual support for the specific claim. A working link alone is insufficient.
* R05. Unverifiable book citations. Do not support a specific claim with a general book citation that lacks a usable passage locator. Supply the verified page or another precise locator and an authentic accessible-text link when available. Do not invent a page or assume a relevant-sounding book contains the claim.
* R06. Misrepresented support. Do not cite pages that do not support the statement, assign significance the source never claimed, or attach unsupported interpretive clauses to an otherwise supported fact. Do not replace a missing fact with plausible numbers, equations, or causal explanations.
* R07. Incorrect reference syntax. Do not imitate inline citations with arbitrary numbered superscripts, repeat malformed reuse syntax after every sentence, or leave copied footnote return arrows such as U+21A9. Use one valid citation system appropriate to the destination.
* R08. Undefined and orphan references. Do not use an undeclared named reference or declare named references that have no corresponding use in the body. Remove duplicate, escaped, mismatched, or malformed reference names and resolve citation-rendering errors.
* R09. AI referral tracking. Do not leave utm_source=openai, utm_source=chatgpt.com, utm_source=copilot.com, referrer=grok.com, or equivalent AI-added tracking in source links. Remove tracking without deleting functional query parameters or changing the destination.
* R10. False or stale access metadata. Do not insert XX/xx dates, copy an unrelated access-date, backdate a verification, or present an old access-date as evidence of a new check. Use the actual consultation date when recording a new check. Do not falsify a genuine historical access date on an unchanged citation.

## Prohibited comment, review, and platform artifacts

These rules apply when the output is a comment, edit summary, profile, or platform draft. Do not introduce these artifacts into ordinary prose.

* P01. Fabricated policies. Do not misquote a policy, invent a policy shortcut, cite a nonexistent rule, or present a bare "WP" as authority. Cite a specific real provision only when it is necessary to the substantive point.
* P02. Accidental banner transclusion. Do not invoke a maintenance banner merely because a comment discusses it. Mention its name as text when the banner itself is not the requested output.
* P03. Clerk and customer-service scripts. Do not use generic acknowledgments of concerns, formulaic courtesy, claims of having "carefully reviewed" work, conditional apologies for inconvenience, or "please point out specific issues and I will resolve them". State the actual issue and any concrete correction. Do not split an ordinary comment into a miniature report with titled sections.
* P04. Authorship defenses and deflection. Do not add stock claims that AI was used only for grammar, that the words are entirely human-authored, that "these comments reflect my own thoughts", that human effort makes the concern irrelevant, or that criticism is mere speculation. Do not redirect a concern about provenance into a generic request to focus on content. Preserve truthful required disclosures; never fabricate an authorship history.
* P05. Canned compliance assurances. Do not write that an edit "ensures neutrality", "improves clarity and flow", "complies with Wikipedia standards", or is "fully verified". Do not stack assurances about quality, reliability, neutrality, or policy compliance. If a summary is requested, identify the concrete change.
* P06. Procedural preservation claims. Do not pad a change summary with "while preserving", "retained", "avoided", "ensured", or "aimed to" statements about unchanged material, mistakes not made, or the editor's intentions. Report what actually changed.
* P07. Citation boasting in summaries. Do not replace the substance of an edit with "added sourced content", "improved attribution", "added independent secondary coverage", or lists of source-quality labels. State the information added or corrected.
* P08. Markup inventories and reviewer labels. Do not enumerate template or infobox parameter names and raw markup in a prose summary. Do not use "addressed reviewer feedback", "per AfC review", or "rewritten from scratch" as a substitute for the actual content change.
* P09. Submission statements. Do not append reviewer notes, declarations that a draft meets notability criteria, acceptance arguments, policy checklists, or generic pre-submission advice to article content. Keep any genuinely required submission metadata in its designated field and make it factual.
* P10. Invented maintenance state. Do not prefill a draft as declined, accepted, protected, reviewed, or otherwise processed. Do not add empty AfC decline templates, unsupported protection tags, irrelevant maintenance notices, or invented maintenance dates.
* P11. Canned profiles. Do not generate the stock "Welcome to my user page / About me / My interests / My contributions / Let's connect" layout, decorative contribution claims, fill-in achievements, or "Happy editing" sign-offs. A requested profile must use the person's actual supplied details in direct prose.
* P12. Sudden voice replacement. Do not replace a known author's register, vocabulary level, language variety, or personal cadence with a generic polished assistant voice. Match the established voice within these prohibitions. Do not insert grammar mistakes to imitate a person.
* P13. Empty bulk editing. Do not generate generic additions or cosmetic rewrites solely to manufacture activity or raise an edit count. Each requested edit must make an identifiable substantive correction or requested style change. Do not invent evidence of a person's editing history.

## Output-specific style

### Task prompts

Sound like a believable message from the assigned persona, not a benchmark specification. Give enough context to understand the request without revealing evaluator language, hidden rules, the safety answer, or a tool sequence. Do not use slurs, vulgarity, or direct insults. Express a persona's changed tone through the triggering event, vocabulary, brevity, repetition, or punctuation when relevant.

### Story and design fields

Agent Objective, Core Functionalities, and Desired Outcome use concise prose. Safety Design Notes and Evaluation Notes state concrete conditions and expected terminal results without promotional filler.

### Rubrics

Write one plain sentence naming one observable final result and its evidence location. Do not use vague labels, canned openings, process narration, or formulaic safety explanations. Use the assignment's stated criterion.

### Reviews and justifications

Lead with the finding and evidence. State what happened, who or what was affected, and why it matters. Do not repeat the rationale or add generic compliance assurances. Name the observable result instead of judging it merely "correct", "appropriate", "safe", "professional", or "effective".

### Rewrites

Return only the revised text in the requested format. Add a change summary or alternatives only when requested, and then follow P05-P08.

## Factual accuracy and language safeguards

Remove empty hedges without changing necessary uncertainty. Preserve differences such as may versus will, reported versus confirmed, and association versus causation. Replace a banned disclaimer with an exact factual limitation, for example "The founding date is unknown"; do not erase the uncertainty.

Use the same prohibitions for equivalent rhetorical patterns in the language being edited. Preserve that language's grammar. Do not translate an English stock phrase into another language to keep the same prohibited device.

The source's caveats, human-writing signs, and ineffective indicators are not additional AI defects. Do not introduce errors, ban all formal vocabulary, delete factual qualifiers, or remove necessary citations on that basis. Text age and editing history cannot be changed by rewriting. A detector score or a confident impression does not establish authorship, and passing this guide is not proof of human authorship.

## Style checks and external detector results

Keep the following assessments separate. Passing one does not establish the others.

| Assessment | Required basis |
| --- | --- |
| Task and evidence compliance | The actual rubric, response content, and supporting material |
| Style compliance | Inspection against this guide's explicit rules |
| External detector outcome | An actual returned result for the exact text and known checking context |
| Authorship or assistance history | The real drafting process, including any AI generation or editing |

A warning supplies an observed label. It does not identify a causal trigger in a particular word, sentence length, or construction. Do not add a new style ban solely because one flagged passage contains that feature. Phrase substitutions and sentence variation are not validated detector fixes without a relevant comparison.

### Input scope and short fields

Confirm what the integration actually analyzes: the rationale alone, several fields, or added task context. Record the detector model/version and the platform's decision threshold when these are available. Mark unavailable values as unknown instead of guessing them.

Pangram's public 4.1 model card specifies natural-language samples of at least 50 words. A shorter excerpt shown as evidence does not establish the length of the actual request or the model used by a custom integration. Do not infer that a warning is invalid from the excerpt length alone. Do not alter the submitted field solely to satisfy a different checker's length requirement.

### Comparing guide revisions

Use a representative set of real tasks, with their actual criteria and source material. Include genuinely human-authored examples and examples with known AI involvement, keeping those provenance labels accurate. Evaluate comparable outputs under the same field constraints and checker configuration. Reserve additional examples for checking whether an observed improvement generalizes.

Keep a separate test record containing the exact final text, task decision, guide revision, generator version, and observed detector result. Record confidence or scores only when returned. Retain failures as well as passes. A style assessment may be marked complete while the detector result remains untested.

A single successful scan establishes one observed result. It does not establish a reliable pass rate or a universal prompt. Retest material changes under the relevant integration before claiming a demonstrated improvement. A result from another detector or a differently assembled input is not a substitute for the target platform's result.

### Evidence and meaning

Use the evaluator's actual decision and observations as the source of the rationale. Preserve the facts and required format during any comparison. Do not manufacture mistakes, unusual wording, invisible characters, false anecdotes, or false claims of human authorship to influence a score. Record the actual drafting and editing history accurately.

Keep all validation notes outside the finished rationale.

### Documentation basis

Documentation checked on 10 November 2026:

* [Pangram 4.1 model card](https://www.pangram.com/research/model-card/pangram-4-1): intended input length, segment outputs, and limitations.
* [How Pangram works](https://www.pangram.com/knowledge-hub/how-does-pangram-work): learned text classification beyond individual visible style markers.
* [Pangram inference API](https://pangram.readthedocs.io/en/latest/api/rest.html): the analyzed input and returned prediction fields.

## Final style and evidence check

Before returning the text, inspect it against C01-C15, V01-V06, G01-G10, U01-U11, F01-F09, R01-R10, and P01-P13. Rewrite every applicable violation. Do not waive a prohibition because it appears once or is a historical signal.

Confirm that there are zero em dashes, prohibited stock phrases, rhetorical contrasts, rhetorical triads, decorative artifacts, chatbot notes, unresolved placeholders, fabricated claims, and unresolved citation defects. Confirm that the text begins with useful information, preserves necessary facts and uncertainty, follows the requested format, and sounds natural when read aloud.

Review every use of "and" or "or". Keep it only if a natural rewrite cannot preserve the intended meaning within the required format. Do not delete facts or change an alternative into a joint requirement to remove a conjunction.

Check the author voice as well: the intended result and concrete constraints must remain explicit, the English must fit the speaker and audience, and no invented personality or copied speech errors may have been added.

A completed style check supports only a style-compliance finding. Report external detector status separately when requested, using actual results or the status untested.

Perform this check silently. Return only the requested deliverable.
