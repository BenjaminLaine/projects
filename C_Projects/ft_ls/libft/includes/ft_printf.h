/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_printf.h                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: blaine <blaine@student.hive.fi>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/12/06 13:19:25 by blaine            #+#    #+#             */
/*   Updated: 2020/03/25 02:34:29 by blaine           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#ifndef FT_PRINTF_H
# define FT_PRINTF_H
# define BUFF_SIZE 32
# include <unistd.h>
# include <stdlib.h>
# include <stdarg.h>

typedef struct		s_stf
{
	char			*str;
	int				printed;
	int				idx;
	char			flags[6];
	int				width;
	int				pres;
	char			convert[3];
	va_list			args;
}					t_stf;

typedef struct		s_list
{
	void			*content;
	size_t			content_size;
	struct s_list	*next;
}					t_list;

int					ft_printf(const char *str, ...);

void				print_f(t_stf *stf);
void				print_s(t_stf *stf);
void				print_o(t_stf *stf);
void				print_u(t_stf *stf);
void				print_x(t_stf *stf);
void				print_pr(t_stf *stf);
void				print_p(t_stf *stf);
void				print_c(t_stf *stf);
void				print_d(t_stf *stf);

size_t				ft_num_count(long long n);
size_t				ft_f_count(unsigned long long n);
char				*ft_ftoa(long double num, int prec);
char				*ft_str_space(t_stf *stf, char **str);
void				ft_get_pres(t_stf *stf, char **str, int count);
void				ft_f_flags_sub1(t_stf *stf, char **str);
void				ft_f_flags_sub2(t_stf *stf, char **str, long double num);
void				ft_f_flags_sub3(t_stf *stf, char **str, long double num);
void				print_argument(t_stf *stf);
void				ft_converts(t_stf *stf);
void				ft_dot(t_stf *stf);
void				ft_reset_flags(t_stf *stf);
void				ft_get_flags(t_stf *stf);
void				make_struct(t_stf *stf, const char *str);
void				ft_put_flags(t_stf *stf, char **str, int cnt, long long n);
void				ft_inc_hash(t_stf *stf, char **str, unsigned long long n);
void				ft_putunbr(unsigned long long n);
void				ft_putnnstr(t_stf *stf, char *str, int n);
void				ft_putnstr(t_stf *stf, int i, int n);
int					ft_printf(const char *str, ...);
char				*ft_pos_front(t_stf *stf, long long num, int cnt);
char				*ft_pos_sub4(t_stf *stf, int cnt, int num);
char				*ft_pos_sub3(t_stf *stf, int cnt);
char				*ft_pos_sub2(t_stf *stf, int cnt);
char				*ft_pos_sub1(t_stf *stf, int cnt);
char				*ft_end_str(t_stf *stf, long long num, int count);
char				*ft_neg_front(t_stf *stf, int cnt, char **str);
void				ft_neg_sub3(t_stf *stf, char **str, int cnt);
void				ft_neg_sub2(t_stf *stf, char **str, int cnt, char *front);
void				ft_neg_sub1(t_stf *stf, char **str, int cnt, char *front);
void				ft_f_flags(t_stf *stf, char **str, long double num);
void				ft_f_space(t_stf *stf, char **str, long double num, int ct);
void				ft_add_space(t_stf *stf, char **str, long long num, int ct);
long double			ft_change_prec(int prec, long double num);

int					ft_isalnum(int c);
int					ft_isalpha(int c);
int					ft_isascii(int c);
int					ft_isdigit(int c);
int					ft_isprint(int c);
int					ft_toupper(int c);
int					ft_tolower(int c);
char				*ft_itoa(long long n);
int					ft_atoi(const char *s);
/*
** Mem functions
*/
void				ft_memdel(void **ap);
void				*ft_memalloc(size_t size);
void				ft_bzero(void *s, size_t n);
void				*ft_memset(void *dest, int c, size_t len);
void				*ft_memchr(const void *s, int c, size_t n);
int					ft_memcmp(const void *s1, const void *s2, size_t n);
void				*ft_memcpy(void *dest, const void *src, size_t len);
void				*ft_memmove(void *dest, const void *src, size_t len);
void				*ft_memccpy(void *dest, const void *src, int c, size_t n);
/*
** Put functions
*/
void				ft_putnbr(long long n);
void				ft_putnbr_fd(long long n, int fd);
void				ft_putchar(char c);
void				ft_putchar_fd(char c, int fd);
void				ft_putendl(char const *s);
void				ft_putendl_fd(char const *s, int fd);
void				ft_putstr(char const *str);
void				ft_putstr_fd(char const *s, int fd);
/*
** Paired str functions
*/
char				*ft_strcat(char *dest, const char *src);
char				*ft_strncat(char *dest, const char *src, size_t n);
size_t				ft_strlcat(char *dest, const char *src, size_t dstsize);
char				*ft_strchr(char const *s, int c);
char				*ft_strrchr(char const *s, int c);
char				*ft_strcpy(char *dest, const char *src);
char				*ft_strncpy(char *dest, const char *src, size_t len);
void				ft_striter(char *s, void (*f)(char *));
void				ft_striteri(char *s, void (*f)(unsigned int, char *));
char				*ft_strmap(char const *s, char (*f)(char));
char				*ft_strmapi(char const *s, char (*f)(unsigned int, char));
int					ft_strequ(char const *s1, char const *s2);
int					ft_strnequ(char const *s1, char const *s2, size_t n);
int					ft_strcmp(const char *s1, const char *s2);
int					ft_strncmp(const char *s1, const char *s2, size_t n);
char				*ft_strstr(const char *haystack, const char *needle);
char				*ft_strnstr(const char *stack, const char *ndle, size_t l);
/*
** Str functions wihtout pair
*/
void				ft_strclr(char *s);
void				ft_strdel(char **as);
char				*ft_strnew(size_t size);
char				*ft_strdup(const char *s1);
size_t				ft_strlen(const char *str);
char				*ft_strtrim(char const *s);
char				**ft_strsplit(char const *str, char c);
char				*ft_strjoin(char const *s1, char const *s2);
char				*ft_strsub(char const *s, unsigned int start, size_t len);
/*
** My own functions
*/
int					ft_sqrt(int n);
int					ft_isspace(int i);
int					ft_isupper(int i);
int					ft_islower(int i);
size_t				ft_strcclen(char *str, int c);
ssize_t				ft_strclen(const char *str, int c);
int					ft_charmequ(char c, const char *s2);
void				ft_destroy_factory(char ***factory);
char				*ft_strndup(const char *s1, size_t n);
int					get_next_line(const int fd, char **line);
char				*ft_itoa_base(long long n, int b, int up);
void				ft_lstaddend(t_list **alst, t_list *newblock);
char				*ft_strnjoin(const char *s1, const char *s2, size_t n);
/*
** Bonus Functions
*/
void				ft_lstadd(t_list **alst, t_list *newblock);
void				ft_lstiter(t_list *lst, void (*f)(t_list *elem));
t_list				*ft_lstmap(t_list *lst, t_list *(*f)(t_list *elem));
t_list				*ft_lstnew(void const *content, size_t content_size);
void				ft_lstdel(t_list **alst, void (*del)(void *, size_t));
void				ft_lstdelone(t_list **alst, void (*del)(void *, size_t));
void				ft_over(char **dest, char *new, size_t start, size_t len);

#endif
