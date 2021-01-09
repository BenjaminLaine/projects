/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   get_next_line.h                                    :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: blaine <blaine@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/10/29 14:34:24 by blaine            #+#    #+#             */
/*   Updated: 2019/11/06 18:51:43 by blaine           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#ifndef GET_NEXT_LINE_H
# define GET_NEXT_LINE_H
# ifndef LIBFT_H
#  include "libft.h"
# endif

int	get_next_line(const int fd, char **line);

# define BUFF_SIZE 1

#endif
